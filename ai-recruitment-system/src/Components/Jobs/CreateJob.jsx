import { useState } from 'react'
import './Jobs.css'

function CreateJob({ onClose, onJobCreated }) {
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: '',
    salary: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newJob = {
      id: Date.now(), // temporary ID
      ...jobData,
      status: 'Active',
      applicants: 0
    }
    onJobCreated(newJob)
  }

  return (
    <div className="create-job-container">
      <h2>Create New Job Posting</h2>
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Job Title</label>
            <input 
              type="text" 
              value={jobData.title}
              onChange={(e) => setJobData({...jobData, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input 
              type="text" 
              value={jobData.department}
              onChange={(e) => setJobData({...jobData, department: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              value={jobData.location}
              onChange={(e) => setJobData({...jobData, location: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select 
              value={jobData.type}
              onChange={(e) => setJobData({...jobData, type: e.target.value})}
              required
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={jobData.description}
            onChange={(e) => setJobData({...jobData, description: e.target.value})}
            rows="6"
            required
          />
        </div>

        <div className="form-group">
          <label>Requirements</label>
          <textarea 
            value={jobData.requirements}
            onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Job Posting
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateJob
