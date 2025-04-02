export function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

export function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <p>⚠️ {message}</p>
    </div>
  )
} 