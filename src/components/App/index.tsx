import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMLoaderPlugin } from '@pixiv/three-vrm';
import Idle from './Idle.vrm';

import SpeechBubble from '../SpeechBubble';
import LoadingBar from '../LoadingCharacter';
import VoiceRecognition from '../VoiceRecognition';


function VrmLoader() {
  const [vrm, setVrm] = useState<VRM | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    // Installer le plugin GLTFLoader
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.load(
      Idle,
      (gltf) => {
        const vrm = gltf.userData.vrm;
        vrm.scene.rotation.y = Math.PI;

        // Ajuster la position du modèle par rapport à la caméra
        vrm.scene.position.set(0, -0.9, -0.5);

        setVrm(vrm);
      },
      (progress) => {
        setLoadingProgress(100.0 * (progress.loaded / progress.total));
      },
      (error) => console.error('Error loading model:', error),
    );
  }, []);

  return (
    <>
      {loadingProgress !== null && loadingProgress < 100 ? (
        <LoadingBar progress={loadingProgress} />
      ) : (
        vrm && <primitive object={vrm.scene} />
      )}
    </>
  );
}

function App() {

  const [text, setText] = useState('');

  const canvasStyle = {
    width: '100vw',
    height: '100vh',
  };

  const canvasCameraSettings = {
    fov: 30,
    near: 0.1,
    far: 20,
    position: [0, 0, 3] as [number, number, number],
  };

  useEffect(() => {
  
    const firstTimeoutId = setTimeout(() => {
      setText('Bonjour !');

      const secondTimeoutId = setTimeout(() => {
        setText('Tapez "/commande" pour afficher toute les commandes.');
      }, 2000);

      return () => clearTimeout(secondTimeoutId);
    }, 4000);

    return () => clearTimeout(firstTimeoutId);
  }, []);

  return (
    <>
      <Canvas style={canvasStyle} camera={canvasCameraSettings}>
        <VoiceRecognition
          onStartListening={() => console.log('Start listening')}
          onStopListening={() => console.log('Stop listening')}
        />
        <SpeechBubble position={[0, 0, 0]} text={text} />
        <ambientLight intensity={1.5} />
        <VrmLoader />
      </Canvas>
    </>
  );
}

export default App;
