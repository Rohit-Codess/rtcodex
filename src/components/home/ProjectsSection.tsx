'use client'

import Link from 'next/link'
import Section from '../ui/Section'
import Container from '../ui/Container'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { projects, Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group">
      <Card className="rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden">
          {project.liveUrl ? (
            <div className="w-full h-48 relative">
              <iframe
                src={project.liveUrl}
                className="w-full h-full border-0 pointer-events-none"
                title={project.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="absolute inset-0 bg-transparent cursor-default"></div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              </div>
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center">
              <span className="text-4xl group-hover:scale-105 transition-transform duration-300">
                {project.image}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
          <p className="text-gray-400 mb-3 text-sm line-clamp-3 flex-1">{project.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-500/10 text-gray-400 rounded text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex gap-3 mt-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                Live Demo →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function ProjectsSection() {
  // Get featured projects (first 6 for homepage)
  const featuredProjects = projects.filter(project => project.featured).slice(0, 6)
  
  return (
    <Section id="projects" background="gradient">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work, featuring full-stack applications, modern web solutions, and innovative digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/projects">
            <Button size="lg" className="group">
              View All Projects
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export { projects }
export type { Project }