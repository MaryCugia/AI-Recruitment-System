import { useState } from 'react'
import ResumeUpload from './ResumeUpload'
import PDFViewer from './PDFViewer'
import BiasDetection from '../AI/BiasDetection'
import './ResumeAnalysis.css'

function ResumeAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileUpload = (file) => {
    setSelectedFile(file)
  }

  return (
    <div className="resume-analysis">
      <div className="resume-analysis-grid">
        <div className="upload-section">
          <h2>Resume Upload</h2>
          <ResumeUpload onFileUpload={handleFileUpload} />
        </div>

        {selectedFile && (
          <>
            <div className="viewer-section">
              <h2>Resume Preview</h2>
              <PDFViewer file={selectedFile} />
            </div>
            
            <div className="analysis-section">
              <BiasDetection resumeText="Sample text for analysis" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ResumeAnalysis
