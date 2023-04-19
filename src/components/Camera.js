import React, { useState, useEffect } from 'react';
import './Camera.css';
import { API } from 'aws-amplify';

const Camera = () => {
  const [cameraStatuses, setCameraStatuses] = useState([
    { id: 1, status: 'idle', x: '80%', y: '70%' },
    { id: 2, status: 'idle', x: '30%', y: '60%' },
    { id: 3, status: 'idle', x: '60%', y: '30%' },
  ]);
  const [lastFetchedImages, setLastFetchedImages] = useState({});

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Replace with your actual API call
      const response = await API.put("teamtitanapi", "/getImages", {});
      setLastFetchedImages(response.lastFetchedImages);

      // Update camera statuses
      setCameraStatuses((prevStatuses) =>
        prevStatuses.map((status) => ({
          ...status,
          status: response.status[status.id] || 'idle',
        })),
      );
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

  return (
    <div style={containerStyle}>
      {cameraStatuses.map((cameraStatus) => (
        <div
          key={cameraStatus.id}
          style={{
            position: 'absolute',
            top: cameraStatus.y,
            left: cameraStatus.x,
            transform: 'translate(-50%, -50%)',
            backgroundColor:
              cameraStatus.status === 'feverDetected' ? 'red' : 'green',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            animation:
              cameraStatus.status === 'feverDetected' ? 'blinking 2s infinite' : '',
          }}
          onClick={() => {
            if (cameraStatus.status === 'feverDetected') {
              window.open(lastFetchedImages[cameraStatus.id], '_blank');
            }
          }}
        />
      ))}
    </div>
  );
};

export default Camera;
