'use client'

import Section from '../ui/Section'
import Container from '../ui/Container'
import { GlowCard } from '../ui/Card'

const workExperience = [
  { 
    title: "Frontend Engineer", 
    description: "React, Next.js, Tailwind CSS, TypeScript", 
    icon: "💻" 
  },
  { 
    title: "Mobile Developer", 
    description: "React Native, Expo, Flutter", 
    icon: "📱" 
  },
  { 
    title: "Backend Engineer", 
    description: "Node.js, Express, PostgreSQL, Prisma", 
    icon: "⚙️" 
  },
  { 
    title: "Cloud & DevOps", 
    description: "AWS, Docker, Kubernetes, CI/CD", 
    icon: "☁️" 
  }
]

export default function ExperienceSection() {
  return (
    <Section id="experience">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Experience & Expertise
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Delivering innovative solutions across the full technology stack
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {workExperience.map((exp, index) => (
            <GlowCard
              key={index}
              icon={exp.icon}
              title={exp.title}
              description={exp.description}
              className="animate-slide-up"
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}