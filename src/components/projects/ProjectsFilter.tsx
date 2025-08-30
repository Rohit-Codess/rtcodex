'use client'

import { useState } from 'react'

interface ProjectsFilterProps {
  onSearchChange: (search: string) => void
  onTagsChange: (tags: string[]) => void
}

const allTags = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion',
  'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
  'React Native', 'FastAPI', 'TensorFlow', 'D3.js', 'GraphQL', 'Prisma',
  'Stripe', 'WebSocket', 'JWT', 'Express', 'Kubernetes'
]

export default function ProjectsFilter({ onSearchChange, onTagsChange }: ProjectsFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearchChange(value)
  }

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    setSelectedTags(newTags)
    onTagsChange(newTags)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTags([])
    onSearchChange('')
    onTagsChange([])
  }

  return (
    <div className="mb-8 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Tags Filter */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-medium text-gray-300">Filter by technology:</span>
          <button
            onClick={clearFilters}
            className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-md hover:bg-red-500/30 transition-colors"
          >
            Clear All
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white border border-blue-400'
                  : 'bg-slate-700/50 text-gray-300 border border-slate-600 hover:bg-slate-600/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedTags.length > 0) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-400">Active filters:</span>
          {searchTerm && (
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
              Search: &quot;{searchTerm}&quot;
            </span>
          )}
          {selectedTags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}