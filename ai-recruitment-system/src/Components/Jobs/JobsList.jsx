import './Jobs.css'

function JobsList({ jobs }) {
  return (
    <div className="jobs-list">
      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className={`status-badge ${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>
            
            <div className="job-details">
              <div className="detail-item">
                <span className="label">Department:</span>
                <span>{job.department}</span>
              </div>
              <div className="detail-item">
                <span className="label">Location:</span>
                <span>{job.location}</span>
              </div>
              <div className="detail-item">
                <span className="label">Type:</span>
                <span>{job.type}</span>
              </div>
              <div className="detail-item">
                <span className="label">Applicants:</span>
                <span>{job.applicants}</span>
              </div>
            </div>

            <div className="job-actions">
              <button className="action-btn">View Details</button>
              <button className="action-btn">Edit</button>
              <button className="action-btn">Close Job</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobsList
