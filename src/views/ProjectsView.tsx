'use client'

import { useState, Suspense } from 'react'
import Navbar from '../components/layout/Navbar'
import Background from '../components/layout/Background'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import ProjectsFilter from '../components/projects/ProjectsFilter'

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

export default function ProjectsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
        {/* 3D Background */}
        <Background />
        
        {/* Navigation */}
        <Navbar />

        {/* Projects Page */}
        <Section className="min-h-screen pt-24 md:pt-32">
          <Container>
            {/* Page Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 gradient-text animate-slide-up">
                My Projects
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto animate-slide-up" 
                 style={{ animationDelay: '0.2s' }}>
                Explore my collection of projects showcasing modern web development, 
                mobile applications, and innovative solutions built with cutting-edge technologies.
              </p>
            </div>

            {/* Filters */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <ProjectsFilter 
                onSearchChange={handleSearchChange}
                onTagsChange={handleTagsChange}
              />
            </div>

            {/* Projects Grid */}
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <ProjectsGrid 
                searchTerm={searchTerm}
                selectedTags={selectedTags}
              />
            </div>
          </Container>
        </Section>

        {/* Footer */}
        <footer className="py-6 md:py-8 border-t border-white/10 relative mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              © 2025 RTcodeX. Built with Next.js, Three.js & Framer Motion.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Optimized for all devices and connection speeds | Portfolio v2.0
            </p>
          </div>
        </footer>
      </div>
    </Suspense>
  )
}