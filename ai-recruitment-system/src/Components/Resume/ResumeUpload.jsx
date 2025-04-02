import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import './ResumeUpload.css'

function ResumeUpload({ onFileUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file?.type === 'application/pdf') {
      onFileUpload(file)
    } else {
      alert('Please upload a PDF file')
    }
  }, [onFileUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  })

  return (
    <div className="resume-upload-container">
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="upload-content">
          <i className="upload-icon">📄</i>
          {isDragActive ? (
            <p>Drop the resume here...</p>
          ) : (
            <>
              <p>Drag & drop a resume PDF here, or click to select</p>
              <span className="upload-hint">Supported format: PDF</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeUpload
