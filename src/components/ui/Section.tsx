'use client'

import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  background?: 'default' | 'gradient' | 'transparent'
}

export default function Section({ 
  children, 
  id, 
  className = '', 
  background = 'default' 
}: SectionProps) {
  const backgroundClasses = {
    default: '',
    gradient: 'bg-gradient-to-b from-transparent to-blue-900/20',
    transparent: 'bg-transparent'
  }

  return (
    <section 
      id={id} 
      className={`py-12 md:py-20 relative ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </section>
  )
}