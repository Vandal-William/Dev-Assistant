import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group} from 'three';

interface SpeechBubbleProps {
  position: [number, number, number];
  text: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ position, text }) => {
  const bubbleRef = useRef<Group>(new Group());

  useEffect(() => {
    // Mise à jour de la position lorsqu'il y a un changement dans la propriété 'position'
    if (bubbleRef.current) {
      bubbleRef.current.position.set(position[0], position[1] -0.3, position[2]);
    }
  }, [position]);

  // Utiliser useFrame pour effectuer d'autres actions à chaque frame si nécessaire
  useFrame(() => {
    // Autres actions à effectuer à chaque frame
  });

  return (
    <group ref={bubbleRef}>
      <Text
        position={[0, 1, 0]}
        fontSize={0.03}
        color="white"
        maxWidth={0.7}
      >
        {text}
      </Text>
    </group>
  );
};

export default SpeechBubble;
