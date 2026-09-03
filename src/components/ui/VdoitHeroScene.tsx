import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The VDOIT hero scene: a frosted glass cube on a layered platform, ringed by
 * orbits and secondary data elements.
 *
 * Self-contained and layout-agnostic — it takes a className and fills whatever
 * container it is given.
 */

interface HoverProps {
  isHovered: boolean;
}

// --- Sub-Component: Layered Base Platform ---
function BasePlatform() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Top Glass Step */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.1}
          transmission={0.9}
          ior={1.4}
          color="#f3e8ff"
          attenuationColor="#a855f7"
          attenuationDistance={1}
        />
      </mesh>

      {/* Illuminated Base Step */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[3.8, 0.3, 3.8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Purple Glowing Trim */}
      <mesh position={[0, -0.42, 0]}>
        <boxGeometry args={[4.2, 0.05, 4.2]} />
        <meshBasicMaterial color="#9333ea" />
      </mesh>

      {/* Platform Soft Underglow */}
      <pointLight position={[0, -0.8, 0]} intensity={1.5} color="#a855f7" distance={6} />
    </group>
  );
}

// --- Sub-Component: Central Frosted Glass Vdoit Cube ---
function CentralCube({ isHovered }: HoverProps) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(state => {
    if (coreRef.current) {
      coreRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * (isHovered ? 0.05 : 0.02)
      );
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      {/* Outer Glass Shell */}
      <mesh>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          thickness={1.2}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          attenuationDistance={1.5}
          attenuationColor="#9333ea"
          color="#f3e8ff"
        />
      </mesh>

      {/* Glowing Inner Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={isHovered ? '#c084fc' : '#a855f7'} />
      </mesh>

      {/* Inner Point Light for Dynamic Core Glow */}
      <pointLight intensity={isHovered ? 3.5 : 2.0} color="#a855f7" distance={4} />

      {/* 3D "vdoit" Front-Face Logo. Uses the app's own font stack rather than
          fetching a remote woff2, so it cannot fail on a slow network. */}
      <Text
        position={[0, 0, 1.11]}
        fontSize={0.48}
        color="#6b21a8"
        anchorX="center"
        anchorY="middle"
      >
        vdoit
      </Text>
    </group>
  );
}

// --- Sub-Component: Orbiting Rings & Glowing Nodes ---
function OrbitingRings({ isHovered }: HoverProps) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isHovered ? 0.25 : 0.1);
    }
  });

  return (
    <group ref={ringRef} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
      {/* Primary Outer Ring */}
      <mesh>
        <torusGeometry args={[3.2, 0.012, 16, 100]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.6} />
      </mesh>

      {/* Secondary Inner Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.7, 0.008, 16, 100]} />
        <meshBasicMaterial color="#e9d5ff" transparent opacity={0.4} />
      </mesh>

      {/* Traveling Orbiting Node */}
      <mesh position={[3.2, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#9333ea" />
      </mesh>
    </group>
  );
}

// --- Sub-Component: Floating Secondary Data Elements ---
function FloatingElements({ isHovered }: HoverProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(state => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }
  });

  const spread = isHovered ? 1.15 : 1.0;

  return (
    <group ref={groupRef}>
      {/* Floating Holographic Panel Left */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[-2.4 * spread, 1.2, 0.5]} rotation={[0, 0.4, 0]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshPhysicalMaterial
            color="#f3e8ff"
            transmission={0.8}
            transparent
            opacity={0.7}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Mini Data Cubes Stack Right */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <group position={[2.5 * spread, -0.6, 0.8]}>
          <RoundedBox args={[0.3, 0.3, 0.3]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#c084fc" roughness={0.3} />
          </RoundedBox>
          <RoundedBox
            args={[0.2, 0.2, 0.2]}
            position={[0.25, 0.25, -0.1]}
            radius={0.03}
            smoothness={4}
          >
            <meshStandardMaterial color="#a855f7" roughness={0.3} />
          </RoundedBox>
        </group>
      </Float>

      {/* Shield/Security Glass Element */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[1.2 * spread, -1.2, 1.5]} rotation={[-0.2, -0.3, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.05]} />
          <MeshTransmissionMaterial
            transmission={0.9}
            roughness={0.1}
            color="#e9d5ff"
            attenuationColor="#9333ea"
            attenuationDistance={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

// --- Main Interactive Container Scene ---
function MainComposition({ isHovered }: HoverProps) {
  const sceneGroup = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  // Mouse Interaction: Mouse position parallax with inertia damping
  useFrame((state, delta) => {
    targetRotation.current.x = state.pointer.y * (Math.PI / 36); // ~5 deg limit
    targetRotation.current.y = state.pointer.x * (Math.PI / 25); // ~7 deg limit

    if (sceneGroup.current) {
      sceneGroup.current.rotation.x = THREE.MathUtils.damp(
        sceneGroup.current.rotation.x,
        targetRotation.current.x,
        4,
        delta
      );
      sceneGroup.current.rotation.y = THREE.MathUtils.damp(
        sceneGroup.current.rotation.y,
        targetRotation.current.y,
        4,
        delta
      );
    }
  });

  return (
    <group ref={sceneGroup} position={[0, -0.2, 0]}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.3}>
        <CentralCube isHovered={isHovered} />
        <BasePlatform />
        <OrbitingRings isHovered={isHovered} />
        <FloatingElements isHovered={isHovered} />
      </Float>
    </group>
  );
}

interface VdoitHeroSceneProps {
  className?: string;
}

// --- Exported Component ---
export function VdoitHeroScene({ className = '' }: VdoitHeroSceneProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', minHeight: '450px', position: 'relative' }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 45 }}
        dpr={[1, 2]} // Automatic optimization for high DPI displays
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#e9d5ff" />

        <MainComposition isHovered={isHovered} />
      </Canvas>
    </div>
  );
}

export default VdoitHeroScene;
