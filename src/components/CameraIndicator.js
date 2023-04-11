// CameraIndicator.js
import React, { useState, useEffect } from 'react';
import './CameraIndicator.css';

const CameraIndicator = ({ status, lastFetchedImageUrl }) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    let flashingInterval;

    if (status === 'fever_detected') {
      flashingInterval = setInterval(() => {
        setIsFlashing((prevIsFlashing) => !prevIsFlashing);
      }, 500);
    }

    return () => {
      if (flashingInterval) {
        clearInterval(flashingInterval);
      }
    };
  }, [status]);

  const handleClick = () => {
    if (status === 'fever_detected') {
      // Display the last fetched image
      window.open(lastFetchedImageUrl, '_blank');
    }
  };

  const indicatorColor = status === 'idle' ? 'yellow' : isFlashing ? 'red' : 'transparent';

  return (
    <div
      className="camera-indicator"
      style={{ backgroundColor: indicatorColor }}
      onClick={handleClick}
    ></div>
  );
};

export default CameraIndicator;
