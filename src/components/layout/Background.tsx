'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Float } from '@react-three/drei'
import { useDevicePerformance } from '@/hooks/useDevicePerformance'
import * as THREE from 'three'

type DevicePerformance = {
  isMobile: boolean
  isLowEnd: boolean
  preferReducedMotion: boolean
  devicePixelRatio: number
  maxParticles: number
  maxShapes: number
}

// Optimized Floating Shape Component
function OptimizedFloatingShape({ 
  shape, 
  position, 
  color, 
  size = 1, 
  speed = 1,
  isLowEnd = false
}: {
  shape: 'sphere' | 'box'
  position: [number, number, number]
  color: string
  size?: number
  speed?: number
  isLowEnd?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current && !isLowEnd) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.01 * speed
      // Reduced animation intensity for better performance
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.005
    }
  })

  const material = useMemo(() => (
    <meshBasicMaterial
      color={color}
      transparent
      opacity={isLowEnd ? 0.4 : 0.6}
    />
  ), [color, isLowEnd])

  if (shape === 'sphere') {
    return (
      <Sphere ref={meshRef} position={position} args={[size, 16, 16]}>
        {material}
      </Sphere>
    )
  }

  return (
    <Box ref={meshRef} position={position} args={[size, size, size]}>
      {material}
    </Box>
  )
}

// Lightweight Particle System
function OptimizedParticles({ 
  count, 
  isLowEnd = false 
}: { 
  count: number
  isLowEnd?: boolean 
}) {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count])

  useFrame(() => {
    if (particlesRef.current && !isLowEnd) {
      particlesRef.current.rotation.y += 0.0002
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isLowEnd ? 1 : 1.5}
        vertexColors
        transparent
        opacity={isLowEnd ? 0.5 : 0.7}
        sizeAttenuation={false}
      />
    </points>
  )
}

// Mobile-optimized Background
function MobileBackground() {
  return (
    <div className="fixed inset-0" style={{ zIndex: -10 }}>
      {/* Simple CSS gradients instead of 3D for mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Minimal animated elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Simple moving dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Desktop optimized background
function DesktopBackground({ performance }: { performance: DevicePerformance }) {
  const shapes = useMemo(() => {
    const shapeCount = Math.min(performance.maxShapes, 6)
    const baseShapes = [
      { shape: 'sphere' as const, position: [-15, 8, -8] as [number, number, number], color: '#3b82f6', size: 1.5, speed: 0.8 },
      { shape: 'box' as const, position: [20, -5, -12] as [number, number, number], color: '#8b5cf6', size: 1.8, speed: 0.6 },
      { shape: 'sphere' as const, position: [-10, -8, -5] as [number, number, number], color: '#06b6d4', size: 1.2, speed: 1.0 },
      { shape: 'box' as const, position: [15, 12, -10] as [number, number, number], color: '#f59e0b', size: 2.0, speed: 0.7 },
      { shape: 'sphere' as const, position: [25, 3, -15] as [number, number, number], color: '#ef4444', size: 1.4, speed: 0.9 },
      { shape: 'box' as const, position: [-20, 5, -14] as [number, number, number], color: '#10b981', size: 1.6, speed: 0.5 }
    ]
    
    return baseShapes.slice(0, shapeCount)
  }, [performance.maxShapes])

  return (
    <div className="fixed inset-0" style={{ zIndex: -10 }}>
      <Suspense fallback={<MobileBackground />}>
        <Canvas
          camera={{ position: [0, 0, 25], fov: 75 }}
          style={{ background: 'transparent' }}
          gl={{ 
            alpha: true, 
            antialias: !performance.isLowEnd,
            powerPreference: performance.isMobile ? "low-power" : "high-performance"
          }}
          dpr={Math.min(performance.devicePixelRatio, 2)} // Cap pixel ratio
          frameloop={performance.preferReducedMotion ? 'never' : 'always'}
        >
          {/* Simplified lighting */}
          <ambientLight intensity={0.6} />
          <pointLight position={[20, 20, 20]} intensity={0.8} color="#3b82f6" />
          
          {/* Optimized floating shapes */}
          {shapes.map((shapeProps, index) => (
            <Float 
              key={index} 
              speed={performance.isLowEnd ? 0.5 : 1} 
              rotationIntensity={performance.isLowEnd ? 0.2 : 0.5}
              floatIntensity={performance.isLowEnd ? 0.2 : 0.4}
            >
              <OptimizedFloatingShape {...shapeProps} isLowEnd={performance.isLowEnd} />
            </Float>
          ))}
          
          {/* Optimized particles */}
          {!performance.preferReducedMotion && (
            <OptimizedParticles count={performance.maxParticles} isLowEnd={performance.isLowEnd} />
          )}
          
          {/* Simplified fog */}
          <fog attach="fog" args={['#0f172a', 30, 80]} />
        </Canvas>
      </Suspense>
      
      {/* CSS gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 pointer-events-none" />
      
      {/* Reduced animated elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
    </div>
  )
}

// Main Background Component with Performance Detection
export default function Background() {
  const performance = useDevicePerformance()

  // Show mobile background for mobile devices or low-end devices
  if (performance.isMobile || performance.isLowEnd || performance.preferReducedMotion) {
    return <MobileBackground />
  }

  // Show optimized desktop background
  return <DesktopBackground performance={performance} />
}
