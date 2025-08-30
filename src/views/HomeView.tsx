'use client'

import { useState, Suspense, useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import Background from '../components/layout/Background'
import HeroSection from '../components/home/HeroSection'
import ExperienceSection from '../components/home/ExperienceSection'
import TechStackSection from '../components/home/TechStackSection'
import ProjectsSection from '../components/home/ProjectsSection'
import ContactSection from '../components/home/ContactSection'

// Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 border-b-purple-500 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  )
}

export default function HomeView() {
  const [activeSection, setActiveSection] = useState('home')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleViewProjects = () => {
    setActiveSection('projects')
    if (isClient) {
      const element = document.querySelector('#projects')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleGetInTouch = () => {
    setActiveSection('contact')
    if (isClient) {
      const element = document.querySelector('#contact')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
        {/* 3D Background */}
        <Background />
        
        {/* Navigation */}
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

        {/* Hero Section */}
        <HeroSection 
          onViewProjects={handleViewProjects}
          onGetInTouch={handleGetInTouch}
        />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Tech Stack Section */}
        <TechStackSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-6 md:py-8 border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-gray-400 text-sm md:text-base">
              © 2024 RTcodeX | 
            </span>
            <span className="text-gray-500 text-xs mt-2 px-1">
              All rights reserved
            </span>
          </div>
        </footer>
      </div>
    </Suspense>
  )
}