import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface LoadingBarProps {
  progress: number;
}

const LoadingCharacter: React.FC<LoadingBarProps> = ({ progress }) => {
  const meshRef = useRef<Mesh>(null);

  // Mettre à jour la taille du plan en fonction du progrès
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.x = progress / 100;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 0.1]} />
      <meshBasicMaterial color="#4caf50" />
    </mesh>
  );
};

export default LoadingCharacter;
