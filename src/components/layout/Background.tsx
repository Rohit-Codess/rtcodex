'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Box, Octahedron, Torus, Float } from '@react-three/drei'
import * as THREE from 'three'

// Floating 3D Shape Component
function FloatingShape({ 
  shape, 
  position, 
  color, 
  size = 1, 
  speed = 1 
}: {
  shape: 'sphere' | 'box' | 'octahedron' | 'torus'
  position: [number, number, number]
  color: string
  size?: number
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.02 * speed
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.01
    }
  })

  const renderShape = () => {
    const material = (
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    )

    switch (shape) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} position={position} args={[size]}>
            {material}
          </Sphere>
        )
      case 'box':
        return (
          <Box ref={meshRef} position={position} args={[size, size, size]}>
            {material}
          </Box>
        )
      case 'octahedron':
        return (
          <Octahedron ref={meshRef} position={position} args={[size]}>
            {material}
          </Octahedron>
        )
      case 'torus':
        return (
          <Torus ref={meshRef} position={position} args={[size, size * 0.4, 16, 32]}>
            {material}
          </Torus>
        )
      default:
        return null
    }
  }

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={0.6}>
      {renderShape()}
    </Float>
  )
}

// Particle System
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null!)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      
      const color = new THREE.Color()
      color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      particlesRef.current.rotation.x += 0.0003
      
      // Add floating motion to particles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Animated Grid
function AnimatedGrid() {
  const gridRef = useRef<THREE.GridHelper>(null!)
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = ((state.clock.elapsedTime * 2) % 40) - 20
      gridRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[200, 100, '#3b82f6', '#1e40af']}
      position={[0, -30, 0]}
    />
  )
}

// Additional floating geometric shapes
function ExtraShapes() {
  return (
    <>
      {/* More floating shapes for richness */}
      <FloatingShape 
        shape="sphere" 
        position={[35, -8, -30]} 
        color="#06b6d4" 
        size={1.8} 
        speed={0.9} 
      />
      <FloatingShape 
        shape="box" 
        position={[-35, 12, -25]} 
        color="#a855f7" 
        size={2.5} 
        speed={0.7} 
      />
      <FloatingShape 
        shape="octahedron" 
        position={[28, 18, -35]} 
        color="#f59e0b" 
        size={1.6} 
        speed={1.4} 
      />
      <FloatingShape 
        shape="torus" 
        position={[-28, -18, -40]} 
        color="#ef4444" 
        size={2.8} 
        speed={0.8} 
      />
      <FloatingShape 
        shape="sphere" 
        position={[45, 25, -15]} 
        color="#10b981" 
        size={1.4} 
        speed={1.6} 
      />
      <FloatingShape 
        shape="box" 
        position={[-45, -25, -20]} 
        color="#f97316" 
        size={2.1} 
        speed={1.1} 
      />
    </>
  )
}

// Main Background Component
export default function Background() {
  const shapes = useMemo(() => [
    { shape: 'sphere' as const, position: [-20, 10, -10] as [number, number, number], color: '#3b82f6', size: 2.0, speed: 1.2 },
    { shape: 'box' as const, position: [25, -5, -15] as [number, number, number], color: '#8b5cf6', size: 2.5, speed: 0.8 },
    { shape: 'octahedron' as const, position: [-15, -10, -8] as [number, number, number], color: '#06b6d4', size: 2.2, speed: 1.5 },
    { shape: 'torus' as const, position: [20, 15, -12] as [number, number, number], color: '#f59e0b', size: 3.0, speed: 0.9 },
    { shape: 'sphere' as const, position: [30, 5, -20] as [number, number, number], color: '#ef4444', size: 1.8, speed: 1.1 },
    { shape: 'box' as const, position: [-25, 8, -18] as [number, number, number], color: '#10b981', size: 2.3, speed: 0.7 },
    { shape: 'octahedron' as const, position: [15, -15, -5] as [number, number, number], color: '#f97316', size: 1.9, speed: 1.3 },
    { shape: 'torus' as const, position: [-30, -2, -25] as [number, number, number], color: '#a855f7', size: 2.6, speed: 0.6 }
  ], [])

  return (
    <div className="fixed inset-0" style={{ zIndex: -10 }}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 30], fov: 75 }}
          style={{ 
            background: 'transparent', 
            width: '100%', 
            height: '100%' 
          }}
          gl={{ 
            alpha: true, 
            antialias: true, 
            powerPreference: "high-performance" 
          }}
        >
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[30, 30, 30]} intensity={1.2} color="#3b82f6" />
          <pointLight position={[-30, -30, -30]} intensity={0.8} color="#8b5cf6" />
          <pointLight position={[30, -30, 20]} intensity={0.6} color="#06b6d4" />
          <directionalLight position={[0, 20, 10]} intensity={0.5} />
          
          {/* Main Floating Shapes */}
          {shapes.map((shapeProps, index) => (
            <FloatingShape key={index} {...shapeProps} />
          ))}
          
          {/* Extra Shapes for more density */}
          <ExtraShapes />
          
          {/* Rich Particle Field */}
          <ParticleField />
          
          {/* Animated Grid */}
          <AnimatedGrid />
          
          {/* Enhanced Fog for depth */}
          <fog attach="fog" args={['#0f172a', 40, 120]} />
        </Canvas>
      </Suspense>
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-900/90 pointer-events-none" />
      
      {/* Multiple Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-float" />
      <div className="absolute top-3/4 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-float-delayed" style={{ animationDelay: '3s' }} />
    </div>
  )
}
