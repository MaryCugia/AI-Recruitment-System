const Job = require('../models/Job');
const User = require('../models/User');
const { matchCandidates } = require('../utils/aiHelper');

exports.createJob = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const job = new Job({
      ...req.body,
      recruiter: user._id,
      company: user.company
    });

    await job.save();

    
    if (job.status === 'published') {
      matchCandidates(job);
    }

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { search, skills, type, location } = req.query;
    let query = { status: 'published' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    if (type) {
      query.type = type;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const jobs = await Job.find(query)
      .populate('recruiter', 'name company')
      .sort('-createdAt');

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('recruiter', 'name company');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: user._id },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      recruiter: user._id
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};
