const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const { assessApplication } = require('../utils/aiHelper');

exports.apply = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    
    const existingApplication = await Application.findOne({
      job: job._id,
      candidate: user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied to this job' });
    }

    const application = new Application({
      job: job._id,
      candidate: user._id
    });

    await application.save();

    
    job.applications.push(application._id);
    await job.save();

    
    assessApplication(application._id);

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error applying to job' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let applications;
    if (user.role === 'candidate') {
      applications = await Application.find({ candidate: user._id })
        .populate('job')
        .sort('-appliedAt');
    } else {
      const jobs = await Job.find({ recruiter: user._id });
      const jobIds = jobs.map(job => job._id);
      applications = await Application.find({ job: { $in: jobIds } })
        .populate('candidate')
        .populate('job')
        .sort('-appliedAt');
    }

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const application = await Application.findById(req.params.id)
      .populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }


    if (application.job.recruiter.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    application.status = status;
    application.updatedAt = Date.now();
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
};
