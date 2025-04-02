import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'
// Import your logo - adjust the path based on your file location and name
import logo from '../images/Logo6.jpg' // Change this to your actual logo file name

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState('recruiter')
  const location = useLocation()
  const navigate = useNavigate()

  const recruiterNavItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/candidates', label: 'Candidates' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/settings', label: 'Settings' }
  ]

  const candidateNavItems = [
    { path: '/candidate', label: 'Dashboard' },
    { path: '/jobs/search', label: 'Find Jobs' },
    { path: '/applications', label: 'My Applications' },
    { path: '/profile', label: 'Profile' }
  ]

  const navItems = userRole === 'recruiter' ? recruiterNavItems : candidateNavItems

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole)
    // Navigate to the appropriate dashboard based on role
    if (newRole === 'recruiter') {
      navigate('/')
    } else {
      navigate('/candidate')
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to={userRole === 'recruiter' ? '/' : '/candidate'}>
            <img src={logo} alt="AI Recruit Logo" className="logo-image" />
          </Link>
        </div>

        <div className="role-selector">
          <button 
            className={`role-btn ${userRole === 'recruiter' ? 'active' : ''}`}
            onClick={() => handleRoleSwitch('recruiter')}
          >
            Recruiter
          </button>
          <button 
            className={`role-btn ${userRole === 'candidate' ? 'active' : ''}`}
            onClick={() => handleRoleSwitch('candidate')}
          >
            Candidate
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger"></span>
        </button>

        {/* Navigation menu */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            {navItems.map(item => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="user-profile">
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            className="profile-image"
          />
          <div className="profile-dropdown">
            <span>John Doe</span>
            <Link to={userRole === 'candidate' ? '/profile' : '/settings'}>
              {userRole === 'candidate' ? 'Profile' : 'Settings'}
            </Link>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
