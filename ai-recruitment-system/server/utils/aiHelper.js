const { OpenAI } = require('openai');
const Assessment = require('../models/Assessment');
const Application = require('../models/Application');
const User = require('../models/User');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.assessApplication = async (applicationId) => {
  try {
    const application = await Application.findById(applicationId)
      .populate('job')
      .populate('candidate');

    const candidate = await User.findById(application.candidate);
    const resume = candidate.profile.resume;


    let resumeText = '';
    if (resume && resume.url) {
      resumeText = await parseResume(resume.url);
    }


    const prompt = `
      Job Requirements: ${application.job.requirements.join('\n')}
      Required Skills: ${application.job.skills.join(', ')}
      
      Candidate Resume: ${resumeText}
      Candidate Skills: ${candidate.profile.skills.join(', ')}
      
      Please analyze the candidate's fit for this position and provide:
      1. Overall match score (0-100)
      2. Skill match analysis
      3. Experience relevance
      4. Strengths
      5. Areas for improvement
      6. Recommendation
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI recruitment assistant analyzing candidate applications."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const analysis = parseAIResponse(completion.choices[0].message.content);

    
    const assessment = new Assessment({
      application: applicationId,
      resume: {
        parsedText: resumeText,
        skills: candidate.profile.skills
      },
      scores: {
        overall: analysis.score,
        skillMatch: analysis.skillMatch,
        experienceMatch: analysis.experienceMatch
      },
      aiAnalysis: {
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        recommendation: analysis.recommendation
      }
    });

    await assessment.save();


    application.assessment = {
      score: analysis.score,
      feedback: analysis.recommendation,
      skillMatch: analysis.skillMatchDetails
    };
    await application.save();

  } catch (error) {
    console.error('AI Assessment Error:', error);
  }
};

const parseAIResponse = (response) => {
 
  return {
    score: 85, 
    skillMatch: 80,
    experienceMatch: 90,
    strengths: ['Strong technical skills', 'Relevant experience'],
    weaknesses: ['Could improve leadership experience'],
    recommendation: 'Recommended for interview',
    skillMatchDetails: new Map([['JavaScript', 90], ['React', 85]])
  };
};
