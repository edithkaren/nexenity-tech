import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GlobeDots({ theme }: { theme: 'dark' | 'light' }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Create dots for the globe
  const dots = useMemo(() => {
    const radius = 2.5;
    const dotsCount = 8000;
    const positions = new Float32Array(dotsCount * 3);
    const colors = new Float32Array(dotsCount * 3);
    const opacities = new Float32Array(dotsCount);

    const brandColor = new THREE.Color(theme === 'dark' ? '#00f3ff' : '#0070f3');
    const secondaryColor = new THREE.Color(theme === 'dark' ? '#ff2d95' : '#e91e63');

    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotsCount);
      const theta = Math.sqrt(dotsCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Base color logic
      const mixedColor = i % 10 === 0 ? secondaryColor : brandColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
      
      opacities[i] = Math.random();
    }

    return { positions, colors, opacities };
  }, [theme]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Auto rotation
    pointsRef.current.rotation.y += 0.0015;
    pointsRef.current.rotation.x += 0.0005;

    // React to mouse
    const targetRotationX = mouse.y * 0.2;
    const targetRotationY = mouse.x * 0.2;
    
    pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={pointsRef}>
      <Points positions={dots.positions} colors={dots.colors}>
        <PointMaterial
          transparent
          vertexColors
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Inner Glow Sphere */}
      <Sphere args={[2.4, 64, 64]}>
        <meshBasicMaterial 
          color={theme === 'dark' ? '#00f3ff' : '#0070f3'} 
          transparent 
          opacity={0.05} 
        />
      </Sphere>

      {/* Atmospheric Halo */}
      <Sphere args={[2.7, 64, 64]}>
        <meshBasicMaterial 
          color={theme === 'dark' ? '#00f3ff' : '#0070f3'} 
          transparent 
          opacity={0.02} 
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export function Globe3D({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Float
          speed={2} 
          rotationIntensity={0.5} 
          floatIntensity={0.5}
        >
          <GlobeDots theme={theme} />
        </Float>
        
        {theme === 'dark' && (
          <Stars 
            radius={100} 
            depth={50} 
            count={500} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1} 
          />
        )}
      </Canvas>
      
      {/* Decorative Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.05)_0%,transparent_70%)]" />
    </div>
  );
}
