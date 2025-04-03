const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { bucket } = require('../config/storage');

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { 
        'profile': req.body,
        'profile.updatedAt': Date.now()
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const blob = bucket.file(`resumes/${req.user.uid}/${Date.now()}_${req.file.originalname}`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (error) => {
      res.status(500).json({ message: 'Error uploading file' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      
      const user = await User.findOneAndUpdate(
        { firebaseUid: req.user.uid },
        { 
          'profile.resume': {
            url: publicUrl,
            filename: req.file.originalname,
            uploadDate: Date.now()
          }
        },
        { new: true }
      );

      res.json({ url: publicUrl, user });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume' });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { query, skills, location, type } = req.query;
    let searchQuery = { status: 'published' };

    if (query) {
      searchQuery.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (skills) {
      searchQuery.skills = { $in: skills.split(',') };
    }

    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' };
    }

    if (type) {
      searchQuery.type = type;
    }

    const jobs = await Job.find(searchQuery)
      .populate('recruiter', 'name company')
      .sort('-createdAt');

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error searching jobs' });
  }
};

exports.getRecommendedJobs = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const userSkills = user.profile.skills || [];

    const recommendedJobs = await Job.find({
      status: 'published',
      skills: { $in: userSkills }
    })
    .populate('recruiter', 'name company')
    .sort('-createdAt')
    .limit(10);

    res.json(recommendedJobs);
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommended jobs' });
  }
};