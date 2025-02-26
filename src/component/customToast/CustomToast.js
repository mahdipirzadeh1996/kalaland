'use client' // Mark this as a Client Component

import { useEffect, useRef } from 'react'
import { toast, Toaster } from 'react-hot-toast'

import './customToast.scss'

// Custom toast renderer
const CustomToast = (message, options = {}) => {
  return toast.custom(
    (t) => (
      <div
        className={`customToast ${t.visible ? '' : 'customToast exit'}`} // Add exit animation class
        onClick={() => toast.dismiss(t.id)} // Dismiss the toast when clicked
        style={options.style}
      >
        {message}
      </div>
    ),
    options,
  )
}

// Add support for toast.error, toast.success, etc.
CustomToast.error = (message, options = {}) => {
  return CustomToast(message, {
    ...options,
    style: { background: 'red', color: 'white' },
  })
}

CustomToast.success = (message, options = {}) => {
  return CustomToast(message, {
    ...options,
    style: { background: 'green', color: 'white' },
  })
}

export { CustomToast as toast, Toaster }
