'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// (Removed unused NavOrb component)

interface NavbarProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', href: '#home', isExternal: false },
    { id: 'experience', label: 'Experience', href: '#experience', isExternal: false },
    { id: 'tech', label: 'Tech Stack', href: '#tech', isExternal: false },
    { id: 'projects', label: 'Projects', href: '/projects', isExternal: false },
    { id: 'contact', label: 'Contact', href: '#contact', isExternal: false }
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 50)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (href: string, id: string, isExternal: boolean) => {
    setActiveSection?.(id)
    setIsMobileMenuOpen(false)
    
    // Add a small delay to ensure mobile menu closes first
    setTimeout(() => {
      // If we're trying to go to home section
      if (id === 'home') {
        // Check if we're on the projects page or any other page
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          // Navigate to home page
          window.location.href = '/'
        } else {
          // We're already on home page, scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else if (!isExternal && href.startsWith('#')) {
        // For other sections, check if we're on the right page
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          // Navigate to home page with hash
          window.location.href = '/' + href
        } else {
          // We're on home page, scroll to section
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }, isMobileMenuOpen ? 300 : 0) // Wait for mobile menu to close
  }

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/20 animate-pulse"></div>
              <span className="text-xl md:text-2xl font-bold gradient-text">RTcodeX</span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-effect backdrop-blur-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
        style={{
          background: isScrolled 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative w-10 h-10 md:w-12 md:h-12">
                  <Image
                    src="/logo.jpg"
                    alt="RTcodeX Logo"
                    width={48}
                    height={48}
                    className="w-full h-full rounded-full object-cover border-2 border-blue-500/30 shadow-lg"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
                    }}
                    priority
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-600/20 animate-pulse"></div>
                </div>
                <motion.span 
                  className="text-xl md:text-2xl font-bold gradient-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  RTcodeX
                </motion.span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div key={item.id}>
                  {item.isExternal || item.href.startsWith('/') ? (
                    <Link href={item.href}>
                      <motion.div
                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                          activeSection === item.id
                            ? 'text-blue-400 glass-effect'
                            : 'text-gray-300 hover:text-white hover:glass-effect'
                        }`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ 
                          scale: 1.05,
                          rotateX: 5,
                          rotateY: 5
                        }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.button
                      onClick={() => handleNavClick(item.href, item.id, item.isExternal)}
                      className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'text-blue-400 glass-effect'
                          : 'text-gray-300 hover:text-white hover:glass-effect'
                      }`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        transformStyle: 'preserve-3d',
                        transform: activeSection === item.id ? 'translateZ(10px)' : 'translateZ(0px)'
                      }}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 -z-10"
                          layoutId="navbar-indicator"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center space-y-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <motion.div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <motion.div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-effect border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div key={item.id}>
                    {item.href.startsWith('/') ? (
                      <Link href={item.href}>
                        <motion.div
                          className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                            activeSection === item.id
                              ? 'text-blue-400 glass-effect'
                              : 'text-gray-300 hover:text-white hover:glass-effect'
                          }`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 10 }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.button
                        onClick={() => handleNavClick(item.href, item.id, item.isExternal)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === item.id
                            ? 'text-blue-400 glass-effect'
                            : 'text-gray-300 hover:text-white hover:glass-effect'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ x: 10 }}
                      >
                        {item.label}
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{
          scaleX: isScrolled ? 1 : 0,
        }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}