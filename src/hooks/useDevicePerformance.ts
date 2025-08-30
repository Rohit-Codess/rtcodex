'use client'

import { useState, useEffect } from 'react'

interface DevicePerformance {
  isMobile: boolean
  isLowEnd: boolean
  preferReducedMotion: boolean
  devicePixelRatio: number
  maxParticles: number
  maxShapes: number
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isMobile: false,
    isLowEnd: false,
    preferReducedMotion: false,
    devicePixelRatio: 1,
    maxParticles: 500,
    maxShapes: 6
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const detectPerformance = () => {
      // Check if mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                       window.innerWidth <= 768

      // Check for reduced motion preference
      const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Get device pixel ratio
      const devicePixelRatio = window.devicePixelRatio || 1

      // Check for low-end device indicators
      const isLowEnd = (
        // Low memory (if available)
        'deviceMemory' in navigator && (navigator as {deviceMemory?: number}).deviceMemory && (navigator as {deviceMemory: number}).deviceMemory <= 4 ||
        // Low CPU cores
        navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2 ||
        // High device pixel ratio on mobile (can be taxing)
        (isMobile && devicePixelRatio > 2) ||
        // Small screen size
        window.innerWidth <= 480
      )

      // Adjust particles and shapes based on device capability
      let maxParticles = 1000
      let maxShapes = 8

      if (isMobile) {
        maxParticles = isLowEnd ? 50 : 200
        maxShapes = isLowEnd ? 2 : 4
      } else if (isLowEnd) {
        maxParticles = 300
        maxShapes = 4
      }

      if (preferReducedMotion) {
        maxParticles = Math.min(maxParticles, 100)
        maxShapes = Math.min(maxShapes, 2)
      }

      setPerformance({
        isMobile,
        isLowEnd,
        preferReducedMotion,
        devicePixelRatio,
        maxParticles,
        maxShapes
      })
    }

    detectPerformance()

    // Re-check on resize
    window.addEventListener('resize', detectPerformance)
    return () => window.removeEventListener('resize', detectPerformance)
  }, [])

  return performance
}