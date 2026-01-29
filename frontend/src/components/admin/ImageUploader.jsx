import { useState } from 'react'
import { validateFile, getFileSizeDisplay } from '../../utils/fileValidation'

const ImageUploader = ({ onImageSelect, existingImage, label = 'Pet Image' }) => {
  const [preview, setPreview] = useState(existingImage || null)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      setError(validation.error)
      setPreview(null)
      onImageSelect(null)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreview(event.target.result)
      setError('')
      onImageSelect(file)
      setFileName(file.name)
      setFileSize(getFileSizeDisplay(file.size))
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview(null)
    setError('')
    setFileName('')
    setFileSize('')
    onImageSelect(null)
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="space-y-4">
        {/* Preview */}
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg border-2 border-purple-300"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
              {fileName && <div>{fileName}</div>}
              {fileSize && <div>{fileSize}</div>}
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <span className="text-4xl mb-2">🖼️</span>
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-400">PNG, JPG, GIF, WebP up to 5MB</p>
            </div>
          </div>
        )}

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* File Info */}
        {preview && fileName && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
            <p>✓ {fileName}</p>
            <p>{fileSize}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
