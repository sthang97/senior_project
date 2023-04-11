import React, { useState, useEffect } from 'react';
import './Camera.css';
import { API } from 'aws-amplify';

const Camera = () => {
  const [cameraStatus, setCameraStatus] = useState('idle');
  const [lastFetchedImage, setLastFetchedImage] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Replace with your actual API call
      const response = await API.put("teamtitanapi", "/getImages", {});
      setLastFetchedImage(response.lastFetchedImage);
      setCameraStatus(response.status);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const containerStyle = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/FloorPlanMap.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
  };

  const indicatorStyle = {
    position: 'absolute',
    top: '70%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: cameraStatus === 'feverDetected' ? 'red' : 'green',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    animation: cameraStatus === 'feverDetected' ? 'blinking 2s infinite' : '',
  };

  return (
    <div style={containerStyle}>
      <div
        style={indicatorStyle}
        onClick={() => {
          if (cameraStatus === 'feverDetected') {
            window.open(lastFetchedImage, '_blank');
          }
        }}
      />
    </div>
  );
};

export default Camera;
