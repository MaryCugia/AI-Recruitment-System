import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './JobApplication.css'
import ApplicationConfirmation from './ApplicationConfirmation'

function JobApplication() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationData, setApplicationData] = useState({
    resume: null,
    coverLetter: '',
    portfolio: '',
    additionalInfo: '',
    availability: '',
    salaryExpectation: ''
  })

  // Mock job data - in real app, this would come from an API
  const [jobDetails] = useState({
    id: jobId,
    title: "Senior Software Engineer",
    company: "Tech Corp",
    location: "New York",
    type: "Full-time",
    description: "Looking for an experienced software engineer...",
    requirements: [
      "5+ years of experience",
      "Strong knowledge of React and Node.js",
      "Experience with cloud platforms"
    ]
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setApplicationData(prev => ({
      ...prev,
      resume: file
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the application data to your backend
    console.log('Application submitted:', applicationData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <ApplicationConfirmation jobTitle={jobDetails.title} company={jobDetails.company} />
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="application-step">
            <h2>Review Job Details</h2>
            <div className="job-details">
              <h3>{jobDetails.title}</h3>
              <p className="company">{jobDetails.company}</p>
              <p className="location">📍 {jobDetails.location}</p>
              <p className="type">💼 {jobDetails.type}</p>
              
              <div className="description">
                <h4>Job Description</h4>
                <p>{jobDetails.description}</p>
              </div>

              <div className="requirements">
                <h4>Requirements</h4>
                <ul>
                  {jobDetails.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button 
              className="next-btn"
              onClick={() => setStep(2)}
            >
              Continue to Application
            </button>
          </div>
        )

      case 2:
        return (
          <div className="application-step">
            <h2>Submit Your Application</h2>
            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-group">
                <label>Resume/CV</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                  <span className="file-name">
                    {applicationData.resume ? applicationData.resume.name : 'Choose file'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Write your cover letter here..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Portfolio URL (Optional)</label>
                <input
                  type="url"
                  name="portfolio"
                  value={applicationData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://your-portfolio.com"
                />
              </div>

              <div className="form-group">
                <label>Additional Information</label>
                <textarea
                  name="additionalInfo"
                  value={applicationData.additionalInfo}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <div className="form-group">
                <label>Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={applicationData.availability}
                  onChange={handleInputChange}
                  placeholder="When can you start?"
                  required
                />
              </div>

              <div className="form-group">
                <label>Salary Expectation</label>
                <input
                  type="text"
                  name="salaryExpectation"
                  value={applicationData.salaryExpectation}
                  onChange={handleInputChange}
                  placeholder="e.g., $80,000 - $100,000"
                  required
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="job-application">
      <div className="application-header">
        <h1>Apply for {jobDetails.title}</h1>
        <div className="application-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
          <span>Step {step} of 2</span>
        </div>
      </div>

      <div className="application-content">
        {renderStep()}
      </div>
    </div>
  )
}

export default JobApplication 