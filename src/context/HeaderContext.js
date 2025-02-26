'use client'
import { useState, createContext } from 'react'

export const HeaderContext = createContext()

export const HeaderProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  return (
    <HeaderContext.Provider
      value={{ isVisible, setIsVisible, lastScrollY, setLastScrollY }}
    >
      {children}
    </HeaderContext.Provider>
  )
}
