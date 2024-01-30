import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition, SpeechRecognitionOptions } from 'react-speech-recognition';
import React, { useEffect } from 'react';
import { MeshProps } from '@react-three/fiber';
import { Text } from '@react-three/drei';

interface ExtendedSpeechRecognition extends ReturnType<typeof useSpeechRecognition> {
  startListening: (options?: SpeechRecognitionOptions) => void;
  stopListening: () => void;
}

interface VoiceRecognitionButtonProps {
  onStartListening: () => void;
  onStopListening: () => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionButtonProps & MeshProps> = ({
  onStartListening,
  onStopListening,
  ...props
}) => {
  const {listening} = useSpeechRecognition() as ExtendedSpeechRecognition;

  useEffect(() => {
    if (listening) {
      onStartListening();
    } else {
      onStopListening();
    }
  }, [listening, onStartListening, onStopListening]);

  const handleButtonClick = () => {
    if (listening) {
        SpeechRecognition.stopListening();
    } else {
        SpeechRecognition.startListening();
    }
  };

  return (
    <mesh onClick={handleButtonClick} position={[0.3, -0.6, 0]} {...props}>
      <circleGeometry args={[0.1, 32]} />
      <meshStandardMaterial color={listening ? 'green' : 'red'} />
      <Text
        position={[0, 0, 0.01]}
        color="black"
        fontSize={0.05}
        maxWidth={300}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
      >
        Voice
      </Text>
    </mesh>
  );
};

export default VoiceRecognition;
