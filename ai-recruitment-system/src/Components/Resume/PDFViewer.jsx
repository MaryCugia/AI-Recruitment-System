import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import './PDFViewer.css'

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [scale, setScale] = useState(1.0)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-controls">
        <button 
          onClick={() => setPageNumber(page => Math.max(1, page - 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button 
          onClick={() => setPageNumber(page => Math.min(numPages, page + 1))}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
        <div className="zoom-controls">
          <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>-</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.min(2, s + 0.1))}>+</button>
        </div>
      </div>

      <div className="pdf-document">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="loading">Loading PDF...</div>}
          error={<div className="error">Error loading PDF!</div>}
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  )
}

export default PDFViewer
