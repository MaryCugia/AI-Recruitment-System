import { useState } from 'react'
import './Profile.css'

function Profile() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    title: 'Senior Software Engineer',
    bio: 'Experienced software engineer with 5+ years of experience in full-stack development...',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020-01',
        endDate: 'Present',
        description: 'Leading development of cloud-native applications...'
      }
    ],
    education: [
      {
        school: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        graduationYear: '2018'
      }
    ]
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillAdd = (e) => {
    e.preventDefault()
    const newSkill = e.target.skill.value.trim()
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }))
      e.target.skill.value = ''
    }
  }

  const handleSkillRemove = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          className={`edit-btn ${isEditing ? 'save' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Bio</h2>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows="4"
          />
        </div>

        <div className="profile-section">
          <h2>Skills</h2>
          <div className="skills-container">
            <div className="skills-list">
              {profile.skills.map(skill => (
                <span key={skill} className="skill-tag">
                  {skill}
                  {isEditing && (
                    <button 
                      className="remove-skill"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <form onSubmit={handleSkillAdd} className="add-skill-form">
                <input
                  type="text"
                  name="skill"
                  placeholder="Add a skill"
                  className="skill-input"
                />
                <button type="submit" className="add-skill-btn">Add</button>
              </form>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>Experience</h2>
          {profile.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.position}</h3>
              <p className="company">{exp.company}</p>
              <p className="date">{exp.startDate} - {exp.endDate}</p>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="profile-section">
          <h2>Education</h2>
          {profile.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.school}</h3>
              <p className="degree">{edu.degree}</p>
              <p className="date">Graduated: {edu.graduationYear}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile 