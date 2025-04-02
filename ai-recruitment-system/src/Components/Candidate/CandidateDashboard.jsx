import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CandidateDashboard.css'

function CandidateDashboard() {
  const [stats] = useState({
    totalApplications: 12,
    underReview: 5,
    interviews: 3,
    profileCompletion: 85
  })

  const [recentApplications] = useState([
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      status: "Under Review",
      appliedDate: "2024-03-15"
    },
    {
      id: 2,
      jobTitle: "UX Designer",
      company: "Design Studio",
      status: "Interview Scheduled",
      appliedDate: "2024-03-14"
    }
  ])

  const [recommendedJobs] = useState([
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "Remote",
      match: 95,
      postedDate: "2024-03-16"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Web Solutions",
      location: "New York",
      match: 88,
      postedDate: "2024-03-15"
    }
  ])

  const [upcomingInterviews] = useState([
    {
      id: 1,
      company: "Design Studio",
      position: "UX Designer",
      date: "2024-03-20",
      time: "10:00 AM",
      type: "Technical Interview"
    }
  ])

  return (
    <div className="candidate-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, John!</h1>
        <div className="profile-completion">
          <div className="completion-bar">
            <div 
              className="completion-fill"
              style={{ width: `${stats.profileCompletion}%` }}
            ></div>
          </div>
          <span>{stats.profileCompletion}% Profile Complete</span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Stats Overview */}
        <div className="dashboard-section stats-section">
          <h2>Application Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{stats.totalApplications}</span>
              <span className="stat-label">Total Applications</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.underReview}</span>
              <span className="stat-label">Under Review</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.interviews}</span>
              <span className="stat-label">Interviews</span>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Applications</h2>
            <Link to="/applications" className="view-all">View All</Link>
          </div>
          <div className="applications-list">
            {recentApplications.map(app => (
              <div key={app.id} className="application-item">
                <div className="application-info">
                  <h3>{app.jobTitle}</h3>
                  <span className="company">{app.company}</span>
                </div>
                <div className="application-meta">
                  <span className="status">{app.status}</span>
                  <span className="date">Applied: {app.appliedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recommended Jobs</h2>
            <Link to="/jobs/search" className="view-all">View All</Link>
          </div>
          <div className="jobs-list">
            {recommendedJobs.map(job => (
              <div key={job.id} className="job-item">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <span className="company">{job.company}</span>
                  <span className="location">📍 {job.location}</span>
                </div>
                <div className="job-meta">
                  <span className="match">Match: {job.match}%</span>
                  <span className="date">Posted: {job.postedDate}</span>
                </div>
                <Link to={`/jobs/search/${job.id}`} className="apply-btn">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Interviews</h2>
            <Link to="/applications" className="view-all">View All</Link>
          </div>
          <div className="interviews-list">
            {upcomingInterviews.map(interview => (
              <div key={interview.id} className="interview-item">
                <div className="interview-info">
                  <h3>{interview.position}</h3>
                  <span className="company">{interview.company}</span>
                  <span className="type">{interview.type}</span>
                </div>
                <div className="interview-details">
                  <span className="date">📅 {interview.date}</span>
                  <span className="time">⏰ {interview.time}</span>
                </div>
                <button className="prepare-btn">Prepare</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard 