import { useState } from 'react'
import './Analytics.css'

function Analytics() {
  return (
    <div className="analytics-page">
      <header className="page-header">
        <h1>Recruitment Analytics</h1>
        <div className="header-actions">
          <select className="period-select">
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </header>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Time to Hire</h3>
          <div className="metric">
            <span className="number">15</span>
            <span className="unit">days</span>
          </div>
          <p className="trend positive">↑ 20% faster than last period</p>
        </div>

        <div className="analytics-card">
          <h3>Applications per Job</h3>
          <div className="metric">
            <span className="number">45</span>
            <span className="unit">avg</span>
          </div>
          <p className="trend positive">↑ 12% increase</p>
        </div>

        <div className="analytics-card">
          <h3>Interview Success Rate</h3>
          <div className="metric">
            <span className="number">68</span>
            <span className="unit">%</span>
          </div>
          <p className="trend negative">↓ 5% decrease</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h3>Hiring Pipeline Overview</h3>
          <div className="placeholder-chart">
            {/* Chart component will go here */}
            <p>Pipeline visualization will be displayed here</p>
          </div>
        </div>

        <div className="chart-container">
          <h3>Source Quality Analysis</h3>
          <div className="placeholder-chart">
            {/* Chart component will go here */}
            <p>Source quality metrics will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
