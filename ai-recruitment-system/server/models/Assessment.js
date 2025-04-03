const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  resume: {
    parsedText: String,
    skills: [String],
    experience: String,
    education: String
  },
  scores: {
    overall: Number,
    skillMatch: Number,
    experienceMatch: Number,
    educationMatch: Number
  },
  aiAnalysis: {
    strengths: [String],
    weaknesses: [String],
    recommendation: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
