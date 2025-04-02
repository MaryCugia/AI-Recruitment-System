import { useState } from 'react'
import './Applications.css'

function Applications() {
  const [applications] = useState([
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      appliedDate: "2024-03-15",
      status: "Under Review",
      lastUpdated: "2024-03-16",
      notes: "Application received and being reviewed by the hiring team"
    },
    {
      id: 2,
      jobTitle: "UX Designer",
      company: "Design Studio",
      appliedDate: "2024-03-10",
      status: "Interview Scheduled",
      lastUpdated: "2024-03-14",
      notes: "Technical interview scheduled for next week"
    }
  ])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return '#f6ad55'
      case 'interview scheduled':
        return '#4299e1'
      case 'rejected':
        return '#f56565'
      case 'hired':
        return '#48bb78'
      default:
        return '#718096'
    }
  }

  return (
    <div className="applications">
      <div className="applications-header">
        <h1>My Applications</h1>
        <div className="applications-stats">
          <div className="stat-card">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Total Applications</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {applications.filter(app => app.status === 'Under Review').length}
            </span>
            <span className="stat-label">Under Review</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {applications.filter(app => app.status === 'Interview Scheduled').length}
            </span>
            <span className="stat-label">Interviews</span>
          </div>
        </div>
      </div>

      <div className="applications-list">
        {applications.map(application => (
          <div key={application.id} className="application-card">
            <div className="application-header">
              <div className="job-info">
                <h3>{application.jobTitle}</h3>
                <span className="company">{application.company}</span>
              </div>
              <div 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(application.status) }}
              >
                {application.status}
              </div>
            </div>
            
            <div className="application-details">
              <div className="detail-item">
                <span className="label">Applied:</span>
                <span className="value">{application.appliedDate}</span>
              </div>
              <div className="detail-item">
                <span className="label">Last Updated:</span>
                <span className="value">{application.lastUpdated}</span>
              </div>
            </div>

            <div className="application-notes">
              <h4>Latest Update</h4>
              <p>{application.notes}</p>
            </div>

            <div className="application-actions">
              <button className="view-details-btn">View Details</button>
              <button className="withdraw-btn">Withdraw Application</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Applications 