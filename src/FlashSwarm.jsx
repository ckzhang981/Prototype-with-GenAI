import React, { useState } from 'react';
import './FlashSwarm.css'; // Import the CSS file

const FlashSwarm = () => {
  const [swarmTime, setSwarmTime] = useState('');
  const [swarmLocation, setSwarmLocation] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [swarmLogs, setSwarmLogs] = useState([]);

  const handleSwarmSubmit = (e) => {
    e.preventDefault();
    if (swarmTime && swarmLocation) {
      // Record the swarm log
      recordSwarmLog();
      // Reset form fields
      setSwarmTime('');
      setSwarmLocation('');
    } else {
      alert('Please fill out both time and location fields');
    }
  };

  const sendNotification = async () => {
    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: swarmTime,
          location: swarmLocation,
        }),
      });
      if (response.ok) {
        setNotificationSent(true);
        setTimeout(() => {
          setNotificationSent(false);
        }, 5000); // Reset notification status after 5 seconds
      } else {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const recordSwarmLog = () => {
    const newLog = {
      time: swarmTime,
      location: swarmLocation,
      participants: [], // Placeholder for participants, can be filled later
    };
    setSwarmLogs([...swarmLogs, newLog]);
  };

  return (
    <div className="container">
      <h1>Swarm App</h1>
      <form onSubmit={handleSwarmSubmit}>
        <div>
          <label>Time:</label>
          <input
            type="text"
            value={swarmTime}
            onChange={(e) => setSwarmTime(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={swarmLocation}
            onChange={(e) => setSwarmLocation(e.target.value)}
          />
        </div>
        <button type="submit">Start Swarm</button>
        <button type="button" onClick={sendNotification}>Send Notification</button>
      </form>
      <div className={`notification ${notificationSent ? '' : 'hidden'}`}>Notification sent!</div>
      <h2>Swarm Logs</h2>
      <ul>
        {swarmLogs.map((log, index) => (
          <li key={index}>
            <strong>Time:</strong> {log.time}, <strong>Location:</strong>{' '}
            {log.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlashSwarm;
