import { useState } from 'react'
import './BiasDetection.css'

function BiasDetection({ resumeText }) {
  const [biasResults, setBiasResults] = useState({
    gender: { score: 0, findings: [] },
    age: { score: 0, findings: [] },
    ethnicity: { score: 0, findings: [] },
    language: { score: 0, findings: [] }
  })

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeBias = async () => {
    setIsAnalyzing(true)
    // This is where you'll connect to your AI backend
    // For now, we'll simulate analysis
    setTimeout(() => {
      setBiasResults({
        gender: {
          score: 0.82,
          findings: ['Gender-neutral language detected', 'Balanced pronouns used']
        },
        age: {
          score: 0.95,
          findings: ['No age-specific requirements found']
        },
        ethnicity: {
          score: 0.90,
          findings: ['Cultural neutral language used']
        },
        language: {
          score: 0.88,
          findings: ['Professional terminology used', 'Inclusive language detected']
        }
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="bias-detection">
      <div className="bias-header">
        <h2>AI Bias Analysis</h2>
        <button 
          className="analyze-btn"
          onClick={analyzeBias}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      <div className="bias-results">
        {Object.entries(biasResults).map(([category, data]) => (
          <div key={category} className="bias-category">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Bias</h3>
            <div className="bias-meter">
              <div 
                className="bias-fill" 
                style={{ 
                  width: `${data.score * 100}%`,
                  backgroundColor: data.score > 0.8 ? '#4caf50' : 
                                 data.score > 0.6 ? '#ff9800' : '#f44336'
                }}
              />
              <span className="bias-score">{Math.round(data.score * 100)}%</span>
            </div>
            <ul className="bias-findings">
              {data.findings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BiasDetection
