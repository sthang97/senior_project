import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Camera.css';

const Camera = () => {
  const [feverDetected1, setFeverDetected1] = useState(false);
  const [feverDetected2, setFeverDetected2] = useState(false);
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
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

        let feverFound1 = false;
        let feverFound2 = false;

        data.forEach((item) => {
          if (item.payload.includes('CAMID-1') && parseInt(item.time) === latestTime) {
            feverFound1 = true;
            setMessage1(item.payload);
          } else if (item.payload.includes('CAMID-2') && parseInt(item.time) === latestTime) {
            feverFound2 = true;
            setMessage2(item.payload);
          }
        });

        if (feverFound1 && latestTime > lastFetchTime) {
          setFeverDetected1(true);
        } else {
          setFeverDetected1(false);
        }

        if (feverFound2 && latestTime > lastFetchTime) {
          setFeverDetected2(true);
        } else {
          setFeverDetected2(false);
        }

        setLastFetchTime(latestTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [lastFetchTime]);

  const handleClick1 = () => {
    if (feverDetected1) {
      navigate('/message', { state: { message: message1 } });
    }
  };

  const handleClick2 = () => {
    if (feverDetected2) {
      navigate('/message', { state: { message: message2 } });
    }
  };

  return (
    <div className="camera">
      <img src="/FloorPlanMap.png" alt="Floor Plan" className="floorplan" />
      <div
        className={`camera-indicator ${feverDetected1 ? 'fever-detected' : 'idle'}`}
        onClick={handleClick1}
        style={{ top: '32%', left: '30%' }}
      ></div>
      <div
        className={`camera-indicator ${feverDetected2 ? 'fever-detected' : 'idle'}`}
        onClick={handleClick2}
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

