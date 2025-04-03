const Job = require('../models/Job');
const Application = require('../models/Application');
const Assessment = require('../models/Assessment');
const User = require('../models/User');

exports.getJobMetrics = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const timeRange = req.query.range || '30'; // Days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeRange));

    const jobs = await Job.find({
      recruiter: user._id,
      createdAt: { $gte: startDate }
    });

    const jobIds = jobs.map(job => job._id);
    const applications = await Application.find({
      job: { $in: jobIds }
    });

    const metrics = {
      totalJobs: jobs.length,
      jobsByStatus: {
        published: jobs.filter(job => job.status === 'published').length,
        closed: jobs.filter(job => job.status === 'closed').length,
        draft: jobs.filter(job => job.status === 'draft').length
      },
      applicationMetrics: {
        totalApplications: applications.length,
        averageApplicationsPerJob: applications.length / jobs.length,
        applicationsByStatus: {
          pending: applications.filter(app => app.status === 'pending').length,
          reviewing: applications.filter(app => app.status === 'reviewing').length,
          shortlisted: applications.filter(app => app.status === 'shortlisted').length,
          interviewed: applications.filter(app => app.status === 'interviewed').length,
          offered: applications.filter(app => app.status === 'offered').length,
          rejected: applications.filter(app => app.status === 'rejected').length
        }
      },
      timeToFill: calculateAverageTimeToFill(jobs, applications),
      popularSkills: analyzePopularSkills(jobs)
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job metrics' });
  }
};

exports.getApplicationMetrics = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const timeRange = req.query.range || '30'; // Days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeRange));

    const jobs = await Job.find({ recruiter: user._id });
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
      appliedAt: { $gte: startDate }
    }).populate('assessment');

    const metrics = {
      totalApplications: applications.length,
      applicationTrends: await getApplicationTrends(applications, timeRange),
      qualityMetrics: {
        averageScore: calculateAverageScore(applications),
        scoreDistribution: calculateScoreDistribution(applications),
        topPerformingCandidates: getTopPerformingCandidates(applications, 5)
      },
      conversionRates: calculateConversionRates(applications),
      timeMetrics: {
        averageTimeToReview: calculateAverageTimeToReview(applications),
        averageTimeToHire: calculateAverageTimeToHire(applications)
      }
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application metrics' });
  }
};

exports.getCandidateMetrics = async (req, res) => {
  try {
    const timeRange = req.query.range || '30';
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeRange));

    const candidates = await User.find({
      role: 'candidate',
      createdAt: { $gte: startDate }
    });

    const metrics = {
      totalCandidates: candidates.length,
      candidateGrowth: await getCandidateGrowthTrend(timeRange),
      skillsDistribution: analyzeSkillsDistribution(candidates),
      experienceLevels: analyzeExperienceLevels(candidates),
      educationLevels: analyzeEducationLevels(candidates),
      locationDistribution: analyzeLocationDistribution(candidates)
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidate metrics' });
  }
};

exports.getAIPerformanceMetrics = async (req, res) => {
  try {
    const timeRange = req.query.range || '30'; // Days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeRange));

    const assessments = await Assessment.find({
      createdAt: { $gte: startDate }
    }).populate('application');

    const metrics = {
      totalAssessments: assessments.length,
      averageAccuracy: calculateAIAccuracy(assessments),
      predictionSuccess: analyzePredictionSuccess(assessments),
      skillMatchingAccuracy: analyzeSkillMatchingAccuracy(assessments),
      processingTimes: calculateProcessingTimes(assessments),
      recommendationEffectiveness: analyzeRecommendationEffectiveness(assessments)
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AI performance metrics' });
  }
};


function calculateAverageTimeToFill(jobs, applications) {
  const filledJobs = jobs.filter(job => job.status === 'closed');
  if (filledJobs.length === 0) return null;

  const totalDays = filledJobs.reduce((acc, job) => {
    const firstApp = applications.find(app => app.job.toString() === job._id.toString());
    if (!firstApp) return acc;
    return acc + (job.updatedAt - firstApp.appliedAt) / (1000 * 60 * 60 * 24);
  }, 0);

  return totalDays / filledJobs.length;
}

async function getApplicationTrends(applications, timeRange) {
  const days = parseInt(timeRange);
  const trends = Array(days).fill(0);
  
  applications.forEach(app => {
    const dayIndex = Math.floor((Date.now() - app.appliedAt) / (1000 * 60 * 60 * 24));
    if (dayIndex < days) {
      trends[dayIndex]++;
    }
  });

  return trends;
}

function calculateScoreDistribution(applications) {
  const distribution = {
    '0-20': 0,
    '21-40': 0,
    '41-60': 0,
    '61-80': 0,
    '81-100': 0
  };

  applications.forEach(app => {
    const score = app.assessment?.score || 0;
    if (score <= 20) distribution['0-20']++;
    else if (score <= 40) distribution['21-40']++;
    else if (score <= 60) distribution['41-60']++;
    else if (score <= 80) distribution['61-80']++;
    else distribution['81-100']++;
  });

  return distribution;
}