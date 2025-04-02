import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './JobSearch.css'

function JobSearch() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    experience: ''
  })

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "New York",
      type: "Full-time",
      experience: "5+ years",
      description: "Looking for an experienced software engineer...",
      postedDate: "2024-03-15",
      salary: "$120k - $150k"
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Seeking a creative UX designer...",
      postedDate: "2024-03-14",
      salary: "$90k - $120k"
    }
  ])

  const handleApply = (jobId) => {
    navigate(`/jobs/search/${jobId}/apply`)
  }

  return (
    <div className="job-search">
      <div className="search-header">
        <h1>Find Your Next Job</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by title, company, or keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="search-content">
        <div className="filters-sidebar">
          <h3>Filters</h3>
          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="City or Remote"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>
          <div className="filter-group">
            <label>Job Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Experience Level</label>
            <select
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
            >
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead</option>
            </select>
          </div>
        </div>

        <div className="jobs-list">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className="company">{job.company}</span>
              </div>
              <div className="job-details">
                <span className="location">📍 {job.location}</span>
                <span className="type">💼 {job.type}</span>
                <span className="experience">⭐ {job.experience}</span>
                <span className="salary">💰 {job.salary}</span>
              </div>
              <p className="job-description">{job.description}</p>
              <div className="job-footer">
                <span className="posted-date">Posted: {job.postedDate}</span>
                <button 
                  className="apply-btn"
                  onClick={() => handleApply(job.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobSearch 