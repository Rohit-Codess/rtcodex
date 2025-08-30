'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Section from '../ui/Section'
import Container from '../ui/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faJs, 
  faReact, 
  faNode, 
  faAws, 
  faDocker 
} from '@fortawesome/free-brands-svg-icons'
import { 
  faBolt, 
  faPaintBrush, 
  faDatabase, 
  faGamepad
} from '@fortawesome/free-solid-svg-icons'

// Enhanced Tech Stack Orbit Component with Moon-like Movement
function TechStackOrbit() {
  const [isMounted, setIsMounted] = useState(false)
  const orbitRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const techStack = useMemo(() => [
    { name: 'TypeScript', icon: faBolt, color: '#60a5fa', orbitRadius: 120, speed: 0.5 },
    { name: 'React', icon: faReact, color: '#22d3ee', orbitRadius: 120, speed: 0.5 },
    { name: 'Next.js', icon: faBolt, color: '#f8fafc', orbitRadius: 120, speed: 0.5 },
    { name: 'Tailwind', icon: faPaintBrush, color: '#06b6d4', orbitRadius: 120, speed: 0.5 },
    { name: 'Node.js', icon: faNode, color: '#22c55e', orbitRadius: 120, speed: 0.5 },
    { name: 'Three.js', icon: faGamepad, color: '#fbbf24', orbitRadius: 120, speed: 0.5 },
  ], [])

  useEffect(() => {
    if (!isMounted) return

    const getResponsiveRadius = () => {
      return window.innerWidth < 768 ? 120 * 0.6 : 120
    }

    const animate = () => {
      const time = Date.now() * 0.001
      
      techStack.forEach((tech, index) => {
        const element = document.getElementById(`orbit-${index}`)
        if (element) {
          // Calculate circular orbital position
          const baseAngle = (index * Math.PI * 2) / techStack.length // Evenly distribute icons
          const currentAngle = baseAngle + (time * tech.speed) // Add rotation over time
          const radius = getResponsiveRadius()
          
          // Perfect circular motion
          const x = Math.cos(currentAngle) * radius
          const y = Math.sin(currentAngle) * radius
          
          // Simple circular motion without complex 3D effects for now
          element.style.transform = `translate(${x}px, ${y}px)`
          element.style.opacity = '1'
          element.style.zIndex = '10'
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMounted, techStack])

  // Don't render until mounted to avoid SSR issues
  if (!isMounted) {
    return (
      <div className="h-80 md:h-96 w-full flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 md:w-64 md:h-64 border-2 border-blue-500/30 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl md:text-6xl animate-pulse">🌍</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-80 md:h-96 w-full flex items-center justify-center relative overflow-hidden orbit-container">
      <div className="relative" ref={orbitRef}>
        {/* Single orbit ring showing the circular path */}
        <div 
          className="border border-blue-500/30 rounded-full animate-spin-slow absolute" 
          style={{ 
            width: 240,
            height: 240,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDuration: '60s' 
          }}
        ></div>
        
        {/* Earth-like center with enhanced effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="text-4xl md:text-6xl animate-float-3d" style={{ 
              filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.7))',
              textShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }}>
              🌍
            </div>
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-glow-pulse-enhanced"></div>
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
          </div>
        </div>
        
        {/* Orbiting tech icons as moons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {techStack.map((tech, index) => (
            <div
              key={index}
              id={`orbit-${index}`}
              className="absolute w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-xl md:text-2xl glass-effect rounded-full shadow-lg orbit-element"
              style={{
                backgroundColor: `${tech.color}20`,
                borderColor: tech.color,
                borderWidth: '2px',
                boxShadow: `0 0 15px ${tech.color}40, 0 0 30px ${tech.color}20`,
              }}
            >
              <FontAwesomeIcon 
                icon={tech.icon}
                style={{ 
                  color: tech.color,
                  filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
                }}
                className="text-xl md:text-2xl"
              />
            </div>
          ))}
        </div>
        
        {/* Orbital trails with enhanced visibility */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="border rounded-full border-blue-500/20"
            style={{
              width: 240,
              height: 240,
              borderStyle: 'dashed',
              borderWidth: '1px',
              opacity: 0.3,
            }}
          />
        </div>
        
        {/* Additional atmospheric effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </div>
  )
}

// Animated Tech Grid Component
function AnimatedTechGrid() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const topRowTech = [
    { name: 'TypeScript', icon: faBolt, color: '#60a5fa' },
    { name: 'Next.js', icon: faBolt, color: '#f8fafc' },
    { name: 'React', icon: faReact, color: '#22d3ee' },
    { name: 'Tailwind', icon: faPaintBrush, color: '#06b6d4' },
    { name: 'Node.js', icon: faNode, color: '#22c55e' },
    { name: 'JavaScript', icon: faJs, color: '#a78bfa' }
  ]

  const bottomRowTech = [
    { name: 'AWS', icon: faAws, color: '#fb923c' },
    { name: 'Docker', icon: faDocker, color: '#3b82f6' },
    { name: 'PostgreSQL', icon: faDatabase, color: '#8b5cf6' },
    { name: 'MongoDB', icon: faDatabase, color: '#10b981' },
    { name: 'Three.js', icon: faGamepad, color: '#fbbf24' }
  ]

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-effect p-4 rounded-xl min-w-[120px] h-[100px] animate-pulse"></div>
          ))}
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-effect p-4 rounded-xl min-w-[120px] h-[100px] animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Top Row - Moving Left */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 md:gap-6 animate-slide-left">
          {[...topRowTech, ...topRowTech].map((tech, index) => (
            <div
              key={index}
              className="glass-effect p-3 md:p-4 lg:p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 group card-hover min-w-[100px] md:min-w-[120px] lg:min-w-[140px] glow-tech-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: `0 0 20px ${tech.color}30, 0 0 40px ${tech.color}20`,
                border: `1px solid ${tech.color}40`
              }}
            >
              <FontAwesomeIcon 
                icon={tech.icon}
                className="text-2xl sm:text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{
                  filter: `drop-shadow(0 0 10px ${tech.color})`,
                  color: tech.color
                }}
              />
              <div className="text-white font-medium text-xs sm:text-sm md:text-base">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Moving Right */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 md:gap-6 animate-slide-right">
          {[...bottomRowTech, ...bottomRowTech].map((tech, index) => (
            <div
              key={index}
              className="glass-effect p-3 md:p-4 lg:p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 group card-hover min-w-[100px] md:min-w-[120px] lg:min-w-[140px] glow-tech-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                boxShadow: `0 0 20px ${tech.color}30, 0 0 40px ${tech.color}20`,
                border: `1px solid ${tech.color}40`
              }}
            >
              <FontAwesomeIcon 
                icon={tech.icon}
                className="text-2xl sm:text-3xl md:text-4xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300"
                style={{
                  filter: `drop-shadow(0 0 10px ${tech.color})`,
                  color: tech.color
                }}
              />
              <div className="text-white font-medium text-xs sm:text-sm md:text-base">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default function TechStackSection() {
  return (
    <Section id="tech" background="gradient">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Technology Stack
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Leveraging modern tools and frameworks to build scalable solutions
          </p>
        </div>

        {/* 3D Tech Orbit */}
        <div className="mb-12 md:mb-16 flex justify-center">
          <TechStackOrbit />
        </div>

        {/* Animated Tech Grid with Sliding Rows */}
        <AnimatedTechGrid />
      </Container>
    </Section>
  )
}