import React from 'react';

const LiveImage = ({ cameraUrl, floorPlanUrl }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${floorPlanUrl})`,
      }}
    >
      <img
        src={cameraUrl}
        alt="Live Camera"
        style={{
          position: 'absolute',
          top: '20%', // Adjust this value to set the camera location on the floor plan
          left: '50%', // Adjust this value to set the camera location on the floor plan
          width: '10%',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

const Camera = () => {
  const cameraUrl = 'https://your-live-image-url.com';
  const floorPlanUrl = `${process.env.PUBLIC_URL}/FloorPlanMap.png`;

  return (
    <div>
      <h1>Live Camera on Floor Plan</h1>
      <br />
      <LiveImage cameraUrl={cameraUrl} floorPlanUrl={floorPlanUrl} />
    </div>
  );
};

export default Camera;
