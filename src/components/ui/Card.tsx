'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  glow = false 
}: CardProps) {
  const baseClasses = "glass-effect rounded-xl border border-white/20 transition-all duration-300"
  const hoverClasses = hover ? "hover:bg-white/20 card-hover" : ""
  const glowClasses = glow ? "glow-effect" : ""

  return (
    <div className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`}>
      {children}
    </div>
  )
}

interface GlowCardProps {
  icon: string
  title: string
  description: string
  className?: string
}

export function GlowCard({ icon, title, description, className = '' }: GlowCardProps) {
  return (
    <Card className={`p-4 md:p-6 glow-effect ${className}`}>
      <div className="text-3xl md:text-4xl mb-3 md:mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm md:text-base text-gray-300">{description}</p>
    </Card>
  )
}