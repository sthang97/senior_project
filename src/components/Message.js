import React from 'react';
import { useLocation } from 'react-router-dom';

const Message = () => {
  const location = useLocation();
  const message = location.state ? location.state.message : 'No message available';

  return (
    <div>
      <h1>Fever Detected</h1>
      <p>{message}</p>
    </div>
  );
};

export default Message;
