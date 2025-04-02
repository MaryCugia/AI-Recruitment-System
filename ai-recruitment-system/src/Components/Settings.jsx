import { useState } from 'react'
import './Settings.css'

function Settings() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="settings-page">
      <header className="page-header">
        <h1>Settings</h1>
      </header>

      <div className="settings-container">
        <div className="settings-sidebar">
          <ul className="settings-tabs">
            <li>
              <button 
                className={activeTab === 'general' ? 'active' : ''} 
                onClick={() => setActiveTab('general')}
              >
                General Settings
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'ai' ? 'active' : ''} 
                onClick={() => setActiveTab('ai')}
              >
                AI Configuration
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'notifications' ? 'active' : ''} 
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </li>
            <li>
              <button 
                className={activeTab === 'team' ? 'active' : ''} 
                onClick={() => setActiveTab('team')}
              >
                Team Management
              </button>
            </li>
          </ul>
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>General Settings</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" defaultValue="AI Recruit" />
                </div>
                <div className="form-group">
                  <label>Time Zone</label>
                  <select defaultValue="UTC">
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="settings-section">
              <h2>AI Configuration</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>AI Bias Detection</label>
                  <div className="toggle-switch">
                    <input type="checkbox" id="bias-detection" defaultChecked />
                    <label htmlFor="bias-detection">Enable</label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Resume Parsing Sensitivity</label>
                  <select defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {/* Add other tab content as needed */}
        </div>
      </div>
    </div>
  )
}

export default Settings
