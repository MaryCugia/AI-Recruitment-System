const User = require('../models/User');
const admin = require('../config/firebase');

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { name, role, company } = req.body;
    const { uid, email } = req.user;

    let user = await User.findOne({ firebaseUid: uid });

    if (user) {
      user = await User.findOneAndUpdate(
        { firebaseUid: uid },
        { 
          name,
          role,
          company,
          email,
          'profile.updatedAt': Date.now()
        },
        { new: true }
      );
    } else {
      user = new User({
        firebaseUid: uid,
        email,
        name,
        role,
        company
      });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ message: 'Error creating/updating user' });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};
