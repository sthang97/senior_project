import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Camera.css';

const Camera = () => {
  const [feverDetected, setFeverDetected] = useState(false);
  const [message, setMessage] = useState('');
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const navigate = useNavigate();

  const latestDataTime = (dataArray) => {
    let latestTime = 0;
    dataArray.forEach((data) => {
      if (parseInt(data.time) > latestTime) {
        latestTime = parseInt(data.time);
      }
    });
    return latestTime;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://ndm4ne7wwc.execute-api.us-east-1.amazonaws.com/dev/iotdata';
        const response = await fetch(apiUrl);
        const data = await response.json();

        const latestTime = latestDataTime(data);

        let feverFound = false;

        data.forEach((item) => {
          if (item.payload.includes('Fever detected') && parseInt(item.time) === latestTime) {
            feverFound = true;
            setMessage(item.payload);
            return;
          }
        });

        if (feverFound && latestTime > lastFetchTime) {
          setFeverDetected(true);
          setLastFetchTime(latestTime);
        } else {
          setFeverDetected(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [lastFetchTime]);

  const handleClick = () => {
    if (feverDetected) {
      navigate('/message', { state: { message } });
    }
  };

  return (
    <div className="camera">
      <img src="/FloorPlanMap.png" alt="Floor Plan" className="floorplan" />
      <div
        className={`camera-indicator ${feverDetected ? 'fever-detected' : 'idle'}`}
        onClick={handleClick}
        style={{ top: '31%', left: '42%' }}
      ></div>
      <div
        className="camera-indicator idle"
        style={{ top: '20%', left: '10%' }}
      ></div>
      <div
        className="camera-indicator idle"
        style={{ top: '10%', left: '60%' }}
      ></div>
    </div>
  );
};

export default Camera;
