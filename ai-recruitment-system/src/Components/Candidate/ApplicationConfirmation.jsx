import { Link } from 'react-router-dom'
import './ApplicationConfirmation.css'

function ApplicationConfirmation({ jobTitle, company }) {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="confirmation-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1>Application Submitted Successfully!</h1>
        <p className="confirmation-message">
          Thank you for applying to the <strong>{jobTitle}</strong> position at <strong>{company}</strong>.
          We'll review your application and get back to you soon.
        </p>

        <div className="next-steps">
          <h2>Next Steps</h2>
          <ul>
            <li>Check your email for a confirmation message</li>
            <li>Track your application status in My Applications</li>
            <li>Continue exploring other opportunities</li>
          </ul>
        </div>

        <div className="confirmation-actions">
          <Link to="/applications" className="primary-btn">
            View My Applications
          </Link>
          <Link to="/jobs/search" className="secondary-btn">
            Find More Jobs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ApplicationConfirmation 