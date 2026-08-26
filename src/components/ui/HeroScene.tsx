import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Points } from 'three';
import type { Tone } from '../../lib/tone';

/**
 * Hero WebGL scene: a wireframe polyhedron inside a drifting particle field.
 * It answers to pointer and scroll, and nothing else — no orbit controls, no
 * models to download. Deliberately quiet: this is texture behind a headline,
 * not the subject. Loaded lazily by HeroCanvas so the bundle cost is opt-in.
 */

const PARTICLE_COUNT = 900;
const FIELD_RADIUS = 5.5;

interface SceneProps {
  tone: Tone;
}

/** Normalized scroll progress through the hero, updated outside React. */
const useScrollProgress = () => {
  const progress = useRef(0);

  React.useEffect(() => {
    const read = () => {
      const limit = window.innerHeight || 1;
      progress.current = Math.min(window.scrollY / limit, 1);
    };
    read();
    window.addEventListener('scroll', read, { passive: true });
    window.addEventListener('resize', read, { passive: true });
    return () => {
      window.removeEventListener('scroll', read);
      window.removeEventListener('resize', read);
    };
  }, []);

  return progress;
};

const ParticleField: React.FC<{ color: string; opacity: number }> = ({ color, opacity }) => {
  const points = useRef<Points>(null);

  // Distributed on a sphere shell so the field reads as volume, not a flat sheet.
  const positions = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = FIELD_RADIUS * (0.55 + Math.random() * 0.45);
      array[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      array[i * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.015;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
};

const CoreMesh: React.FC<{
  accent: string;
  wireOpacity: number;
  scrollProgress: React.MutableRefObject<number>;
}> = ({ accent, wireOpacity, scrollProgress }) => {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const { pointer } = state;
    const scroll = scrollProgress.current;

    // Pointer steers, scroll spins and sinks — both eased, never snapped.
    const targetX = pointer.y * 0.18 + scroll * 0.4;
    const targetY = pointer.x * 0.25 + scroll * Math.PI * 0.6;

    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 1.6, 1);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 1.6, 1);
    group.current.rotation.z += delta * 0.025;

    group.current.position.y = -scroll * 1.4;
    const scale = 1 - scroll * 0.25;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={wireOpacity} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={wireOpacity * 0.5} />
      </mesh>
    </group>
  );
};

const Scene: React.FC<SceneProps> = ({ tone }) => {
  const scrollProgress = useScrollProgress();
  const isDark = tone === 'dark';

  // On a light band the mark has to darken or it disappears into the ground.
  const accent = isDark ? '#60a5fa' : '#2563eb';
  const particleColor = isDark ? '#818cf8' : '#94a3b8';

  return (
    <>
      <CoreMesh
        accent={accent}
        wireOpacity={isDark ? 0.22 : 0.16}
        scrollProgress={scrollProgress}
      />
      <ParticleField color={particleColor} opacity={isDark ? 0.4 : 0.3} />
    </>
  );
};

const HeroScene: React.FC<SceneProps> = ({ tone }) => (
  <Canvas
    // Capped DPR: retina gains nothing here and costs a lot of fill rate.
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 6.2], fov: 50 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
  >
    <Scene tone={tone} />
  </Canvas>
);

export default HeroScene;
