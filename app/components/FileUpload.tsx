'use client'

import { useState, useRef, useCallback } from 'react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  status: 'uploading' | 'success' | 'error'
  progress: number
  error?: string
}

interface FileUploadProps {
  onFilesUploaded?: (files: UploadedFile[]) => void
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedTypes?: string[]
  className?: string
}

export default function FileUpload({
  onFilesUploaded,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['.pdf', '.docx', '.doc'],
  className = ''
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize) {
      return `파일 크기가 너무 큽니다. 최대 ${formatFileSize(maxFileSize)}까지 업로드 가능합니다.`
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `지원하지 않는 파일 형식입니다. 지원 형식: ${acceptedTypes.join(', ')}`
    }

    return null
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files[0]) {
      console.log('File selected:', e.target.files[0])
      handleFiles(e.target.files)
    }
  }, [])

  const handleFiles = useCallback((files: FileList) => {
    console.log('handleFiles called with:', files)
    const fileArray = Array.from(files)
    
    // Check if adding these files would exceed maxFiles limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      setError(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`)
      return
    }

    const newFiles: UploadedFile[] = fileArray.map((file, index) => {
      const validationError = validateFile(file)
      return {
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        status: validationError ? 'error' : 'uploading',
        progress: 0,
        error: validationError || undefined
      }
    })

    const validFiles = newFiles.filter(file => file.status !== 'error')
    const errorFiles = newFiles.filter(file => file.status === 'error')

    if (errorFiles.length > 0) {
      setError(errorFiles.map(f => f.error).join(', '))
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
      setIsUploading(true)

      // Simulate upload progress for valid files
      validFiles.forEach((file, index) => {
        const interval = setInterval(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, progress: Math.min(f.progress + 10, 100) }
                : f
            )
          )
        }, 200)

        setTimeout(() => {
          clearInterval(interval)
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, status: 'success' as const, progress: 100 }
                : f
            )
          )
        }, 2000 + index * 500)
      })

      setTimeout(() => {
        setIsUploading(false)
        if (onFilesUploaded) {
          onFilesUploaded([...uploadedFiles, ...validFiles])
        }
      }, 3000)
    }
  }, [uploadedFiles, maxFiles, onFilesUploaded])

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }, [])

  const retryUpload = useCallback((fileId: string) => {
    setUploadedFiles(prev => 
      prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'uploading' as const, progress: 0, error: undefined }
          : f
      )
    )
    // Simulate retry upload
    setTimeout(() => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'success' as const, progress: 100 }
            : f
        )
      )
    }, 2000)
  }, [])

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className={`w-full ${className}`}>
      {/* File Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              파일을 드래그하여 업로드하거나 클릭하여 선택하세요
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              PDF, DOCX, DOC 파일 (최대 {formatFileSize(maxFileSize)})
            </p>
            <p className="text-xs text-gray-500">
              최대 {maxFiles}개 파일 업로드 가능
            </p>
          </div>

          <button
            type="button"
            onClick={openFileDialog}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            파일 선택
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="ml-3 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center">
            <svg className="animate-spin w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="ml-3 text-sm text-blue-700">파일을 업로드하고 있습니다...</p>
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">업로드된 파일</h4>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {file.status === 'success' ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : file.status === 'error' ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    {file.error && (
                      <p className="text-sm text-red-600">{file.error}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{file.progress}%</span>
                    </div>
                  )}
                  
                  {file.status === 'error' && (
                    <button
                      onClick={() => retryUpload(file.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      재시도
                    </button>
                  )}
                  
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 