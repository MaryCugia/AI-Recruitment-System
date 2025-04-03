const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Assessment = require('../models/Assessment');

exports.getDashboardStats = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    const jobs = await Job.find({ recruiter: user._id });
    const jobIds = jobs.map(job => job._id);
    
    const applications = await Application.find({ job: { $in: jobIds } });
    
    const stats = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(job => job.status === 'published').length,
      totalApplications: applications.length,
      applicationsByStatus: {
        pending: applications.filter(app => app.status === 'pending').length,
        reviewing: applications.filter(app => app.status === 'reviewing').length,
        shortlisted: applications.filter(app => app.status === 'shortlisted').length,
        interviewed: applications.filter(app => app.status === 'interviewed').length,
        offered: applications.filter(app => app.status === 'offered').length,
        rejected: applications.filter(app => app.status === 'rejected').length
      },
      recentApplications: await Application.find({ job: { $in: jobIds } })
        .sort('-appliedAt')
        .limit(5)
        .populate('candidate', 'name email')
        .populate('job', 'title')
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

exports.getPostedJobs = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const jobs = await Job.find({ recruiter: user._id })
      .sort('-createdAt')
      .populate({
        path: 'applications',
        select: 'status assessment.score',
        populate: {
          path: 'candidate',
          select: 'name email profile.skills'
        }
      });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posted jobs' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const { jobId, status, sortBy = 'appliedAt' } = req.query;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    let query = {};
    
    if (jobId) {
      query.job = jobId;
    } else {
     
      const jobs = await Job.find({ recruiter: user._id });
      query.job = { $in: jobs.map(job => job._id) };
    }


    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .sort(sortBy === 'score' ? '-assessment.score' : '-appliedAt')
      .populate('candidate', 'name email profile')
      .populate('job', 'title company');

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, feedback } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    const application = await Application.findById(req.params.id)
      .populate('job');

    
    if (application.job.recruiter.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    application.status = status;
    if (feedback) {
      application.recruiterNotes = feedback;
    }
    application.updatedAt = Date.now();
    
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status' });
  }
};

exports.searchCandidates = async (req, res) => {
  try {
    const { skills, experience, education } = req.query;
    let query = { role: 'candidate' };

    if (skills) {
      query['profile.skills'] = { 
        $in: skills.split(',').map(skill => new RegExp(skill.trim(), 'i')) 
      };
    }

    if (experience) {
      query['profile.experience'] = { $gte: parseInt(experience) };
    }

    if (education) {
      query['profile.education.degree'] = new RegExp(education, 'i');
    }

    const candidates = await User.find(query)
      .select('name email profile.skills profile.experience profile.education');

    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error searching candidates' });
  }
};

exports.getAIInsights = async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    

    const job = await Job.findOne({ 
      _id: jobId, 
      recruiter: user._id 
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applications = await Application.find({ job: jobId })
      .populate('candidate', 'name email profile')
      .populate('assessment');

    const insights = {
      totalApplications: applications.length,
      averageScore: applications.reduce((acc, app) => 
        acc + (app.assessment?.score || 0), 0) / applications.length,
      skillGaps: analyzeSkillGaps(job, applications),
      topCandidates: applications
        .filter(app => app.assessment?.score > 80)
        .sort((a, b) => b.assessment.score - a.assessment.score)
        .slice(0, 5),
      recommendedActions: generateRecommendedActions(job, applications)
    };

    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: 'Error getting AI insights' });
  }
};


function analyzeSkillGaps(job, applications) {

  const requiredSkills = new Set(job.skills);
  const candidateSkills = new Map();
  
  applications.forEach(app => {
    app.candidate.profile.skills.forEach(skill => {
      candidateSkills.set(skill, (candidateSkills.get(skill) || 0) + 1);
    });
  });

  return Array.from(requiredSkills).map(skill => ({
    skill,
    matchRate: (candidateSkills.get(skill) || 0) / applications.length * 100
  }));
}

function generateRecommendedActions(job, applications) {
  
  const recommendations = [];
  const averageScore = applications.reduce((acc, app) => 
    acc + (app.assessment?.score || 0), 0) / applications.length;

  if (averageScore < 70) {
    recommendations.push('Consider revising job requirements to attract more qualified candidates');
  }

  if (applications.length < 10) {
    recommendations.push('Consider promoting the job posting to increase visibility');
  }

  return recommendations;
}
