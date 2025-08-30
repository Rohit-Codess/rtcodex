export interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  category?: 'frontend' | 'fullstack' | 'backend' | 'design'
  featured?: boolean
  status?: 'completed' | 'in-progress' | 'planned'
  year?: string
}

export const projects: Project[] = [
  {
    id: 'kids-school',
    title: 'Kids School Management System',
    description: 'Comprehensive school management platform designed for kids education centers, featuring student enrollment, attendance tracking, and academic management.',
    image: '🏫',
    tags: ['React', 'Tailwind CSS', 'React Router', 'Vite', 'Responsive Design'],
    liveUrl: 'https://school-umber-chi.vercel.app/',
    githubUrl: 'https://github.com/Rohit-Codess/school.git',
    category: 'frontend',
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 'cimpress-redesign',
    title: 'Cimpress Platform Redesign',
    description: 'Modern redesign of Cimpress printing and marketing services platform with enhanced UX/UI, improved navigation, and responsive design.',
    image: '🎨',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UX/UI Design'],
    liveUrl: 'https://cimpress-website.vercel.app/',
    githubUrl: 'https://github.com/Rohit-Codess/cimpress-website.git',
    category: 'design',
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 'vaultize-redesign',
    title: 'Vaultize Security Platform',
    description: 'Complete redesign of Vaultize cybersecurity platform with modern interface, enhanced security features, and dashboard analytics.',
    image: '🔐',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'React Router'],
    liveUrl: 'https://vaultize-website.vercel.app/',
    githubUrl: 'https://github.com/Rohit-Codess/vaultize-website.git',
    category: 'frontend',
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 'student-bill-desk',
    title: 'Student Bill Desk Management',
    description: 'Digital student fee management system for educational institutions, featuring fee collection with no duplicate entries and comprehensive reporting.',
    image: '💳',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'SweetAlert2', 'Axios', 'Mongoose'],
    liveUrl: 'https://student-bill-desk.rtcodex.dev/',
    githubUrl: 'https://github.com/Rohit-Codess/student-bill-desk.git',
    category: 'fullstack',
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 'kk-restaurant',
    title: 'KK Dhaba & Restaurant',
    description: 'Restaurant management platform to streamline operations, inventory management, order processing, staff coordination, and detailed reporting.',
    image: '🍽️',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'NodeMailer'],
    liveUrl: 'https://kk-web.rtcodex.dev/',
    githubUrl: 'https://github.com/Rohit-Codess/kk-web',
    category: 'fullstack',
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 'hr-management-system',
    title: 'HR Management System',
    description: 'Comprehensive HR platform designed to streamline the entire recruitment process, from job posting to offer letter. Built for HR professionals and hiring teams.',
    image: '👥',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'NodeMailer'],
    liveUrl: 'https://hr-lake.vercel.app/',
    githubUrl: 'https://github.com/Rohit-Codess/HR',
    category: 'fullstack',
    featured: true,
    status: 'completed',
    year: '2024'
  },
  {
    id: 'travel-beyond-borders',
    title: 'Travel Beyond Borders',
    description: 'Travel platform that allows users to create, explore, review, and manage listings of travel destinations with authentication and admin panel features.',
    image: '✈️',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Bootstrap', 'Passport.js', 'Cloudinary'],
    liveUrl: 'https://travel-beyond-borders.onrender.com/',
    githubUrl: 'https://github.com/Rohit-Codess/travel-app',
    category: 'fullstack',
    featured: false,
    status: 'completed',
    year: '2023'
  },
  {
    id: 'codepen-clone',
    title: 'CodePen Clone',
    description: 'Full-featured code editor that allows users to create, explore, review, and manage code snippets with authentication and user profiles.',
    image: '💻',
    tags: ['React', 'Node.js', 'Express.js', 'CSS', 'JavaScript', 'Code Editor'],
    liveUrl: 'https://codepen.rtcodex.dev/',
    githubUrl: 'https://github.com/Rohit-Codess/2.-CODE-PEN-CLONE',
    category: 'fullstack',
    featured: false,
    status: 'completed',
    year: '2023'
  },
  {
    id: 'restaurant-erp-system',
    title: 'Restaurant ERP System',
    description: 'Enterprise resource planning system designed for restaurant operations, from inventory and order management to staff coordination and reporting.',
    image: '📊',
    tags: ['React', 'Chart.js', 'React Router', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    liveUrl: '',
    githubUrl: 'https://github.com/Rohit-Codess/RESTAURANT-MANAGEMENT',
    category: 'fullstack',
    featured: false,
    status: 'completed',
    year: '2023'
  },
  {
    id: 'learnflow-tracker',
    title: 'LearnFlow Tracker',
    description: 'Productivity application allowing users to create tasks, track time spent, visualize progress, and receive browser notifications to stay focused.',
    image: '⏱️',
    tags: ['React', 'React Router', 'Web Notification API', 'Bootstrap', 'Local Storage'],
    liveUrl: 'https://learnflow-tracker.vercel.app/',
    githubUrl: 'https://github.com/Rohit-Codess/learnflow-tracker',
    category: 'frontend',
    featured: false,
    status: 'completed',
    year: '2023'
  }
]

// Helper functions for filtering projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured)
}

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category)
}

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getAllTags = (): string[] => {
  const allTags = projects.flatMap(project => project.tags)
  return [...new Set(allTags)].sort()
}

export const getProjectsByTag = (tag: string): Project[] => {
  return projects.filter(project => 
    project.tags.some(projectTag => 
      projectTag.toLowerCase().includes(tag.toLowerCase())
    )
  )
}

export default projects