'use client'

import { useState, useEffect, useMemo } from 'react'
import Section from '../ui/Section'
import Container from '../ui/Container'
import Button from '../ui/Button'

// Dynamic Typing Animation Component
function TypingAnimation() {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  const words = useMemo(() => [
    'Developer',
    'Self Learner',
    'Problem Solver',
    'AI Enthusiast',
    'Tech Explorer',
    'Code Architect',
    'Innovation Driver',
    'Digital Creator',
    'System Designer',
    'Full-Stack Expert'
  ], [])

  useEffect(() => {
    const currentWordText = words[currentWord]
    const typingSpeed = isDeleting ? 100 : 150
    const pauseTime = isDeleting ? 1000 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && currentChar < currentWordText.length) {
        setDisplayText(currentWordText.slice(0, currentChar + 1))
        setCurrentChar(currentChar + 1)
      } else if (isDeleting && currentChar > 0) {
        setDisplayText(currentWordText.slice(0, currentChar - 1))
        setCurrentChar(currentChar - 1)
      } else if (!isDeleting && currentChar === currentWordText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && currentChar === 0) {
        setIsDeleting(false)
        setCurrentWord((currentWord + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentChar, isDeleting, currentWord, words])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setIsVisible(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="inline-block">
      <span className="gradient-text-dynamic font-bold">
        {displayText}
      </span>
      <span 
        className={`inline-block w-1 h-8 md:h-12 lg:h-16 bg-gradient-to-b from-blue-400 to-purple-600 ml-1 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-100`}
        style={{ animation: 'cursor-glow 1.5s ease-in-out infinite' }}
      />
    </span>
  )
}

// 3D Floating Orb Component
function FloatingOrb3D() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse animate-float"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/40 to-pink-600/40 rounded-full blur-2xl animate-pulse"></div>
    </div>
  )
}

interface HeroSectionProps {
  onViewProjects: () => void
  onGetInTouch: () => void
}

export default function HeroSection({ onViewProjects, onGetInTouch }: HeroSectionProps) {
  return (
    <Section id="home" className="min-h-screen flex items-center justify-center pt-20">
      <Container className="text-center relative z-10">
        <div className="relative">
          <FloatingOrb3D />
          
          <div className="relative z-10">
            <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 animate-slide-up"
                style={{
                  textShadow: '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
                  transform: 'perspective(1000px) rotateX(5deg)',
                  transformStyle: 'preserve-3d'
                }}>
              <span className="gradient-text block mb-2">RTcodeX</span>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <TypingAnimation />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto animate-slide-up" 
               style={{ animationDelay: '0.2s' }}>
              Full-Stack Developer & Creative Technologist
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto animate-slide-up" 
               style={{ animationDelay: '0.4s' }}>
              Crafting exceptional digital experiences with cutting-edge technologies.
              Specializing in React, Next.js, Three.js, and cloud architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" 
                 style={{ animationDelay: '0.6s' }}>
              <Button onClick={onViewProjects} size="lg">
                View My Work
              </Button>
              <Button variant="secondary" onClick={onGetInTouch} size="lg">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}