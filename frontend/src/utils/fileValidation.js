export const FILE_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
}

export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' }
  }

  // Check file size
  if (file.size > FILE_CONFIG.MAX_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${FILE_CONFIG.MAX_SIZE / 1024 / 1024}MB`,
    }
  }

  // Check file type
  if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be one of: ${FILE_CONFIG.ALLOWED_EXTENSIONS.join(', ')}`,
    }
  }

  return { valid: true }
}

export const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.')).toLowerCase()
}

export const getFileSizeDisplay = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
