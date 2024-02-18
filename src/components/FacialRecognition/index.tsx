import React, { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import * as faceapi from 'face-api.js';

const FacialRecognition: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
        console.log(videoRef.current)
      handleFacialRecognition();
    }
  }, [videoRef]);

  const handleFacialRecognition = async () => {
    console.log('recognition...')
    setIsLoading(true);

    try {
      // Charger les modèles de reconnaissance faciale
      await faceapi.nets.tinyFaceDetector.loadFromUri('/weights');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/weights');

      // Accéder à la caméra de l'utilisateur
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        throw new Error('Element vidéo introuvable');
      }

      // Capturer une image du flux vidéo ou de la webcam
      const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

      if (detection) {
        console.log(detection)
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'accès à la caméra ou du chargement des modèles :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Html position={[0.18, -0.67, 0]}>
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Authentification en cours...</p>
      ) : isAuthenticated ? (
        <p style={{ textAlign: 'center' }}>Utilisateur authentifié !</p>
      ) : (
        <mesh>
          <video ref={videoRef} id="inputVideo" autoPlay playsInline style={{ maxWidth: "10%" }} />
          <button style={{ cursor: "pointer" }} onClick={handleFacialRecognition}>S'authentifier</button>
        </mesh>
      )}
    </Html>
  );
};

export default FacialRecognition;
