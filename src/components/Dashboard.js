import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    const apiUrl = 'https://ndm4ne7wwc.execute-api.us-east-1.amazonaws.com/dev/iotdata';
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Sort messages by timestamp in descending order
    const sortedData = data.sort((a, b) => parseInt(b.time) - parseInt(a.time));
    setMessages(sortedData);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleClick = (index) => {
    setSelectedMessage(messages[index].payload);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `Date: ${month}-${day}-${year} Time: ${hours}-${minutes}-${seconds}`;
  };

  return (
    <div className="dashboard">
      <div className="message-list">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} onClick={() => handleClick(index)}>
              {formatTimestamp(msg.time)}
            </li>
          ))}
        </ul>
      </div>
      <div className="message-display">
        {selectedMessage ? (
          <p>{selectedMessage}</p>
        ) : (
          <p>Please select a message from the list</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
