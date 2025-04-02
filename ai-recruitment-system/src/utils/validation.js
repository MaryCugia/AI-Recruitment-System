export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validateJobPost = (jobData) => {
  const errors = {}
  if (!jobData.title) errors.title = 'Job title is required'
  if (!jobData.description) errors.description = 'Job description is required'
  if (!jobData.requirements) errors.requirements = 'Job requirements are required'
  return errors
} 