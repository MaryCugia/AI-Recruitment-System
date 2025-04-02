import { useState } from 'react'
import JobsList from './JobsList'
import CreateJob from './CreateJob'
import './Jobs.css'

function Jobs() {
  const [showCreateJob, setShowCreateJob] = useState(false)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "New York",
      type: "Full-time",
      status: "Active",
      applicants: 12
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      status: "Active",
      applicants: 8
    },
    // Add more sample jobs as needed
  ])

  return (
    <div className="jobs-container">
      <header className="jobs-header">
        <h1>Jobs Management</h1>
        <button 
          className="create-job-btn"
          onClick={() => setShowCreateJob(true)}
        >
          Post New Job
        </button>
      </header>

      {showCreateJob ? (
        <CreateJob 
          onClose={() => setShowCreateJob(false)}
          onJobCreated={(newJob) => {
            setJobs([...jobs, newJob])
            setShowCreateJob(false)
          }}
        />
      ) : (
        <JobsList jobs={jobs} />
      )}
    </div>
  )
}

export default Jobs
