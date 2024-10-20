import React, { useEffect, useState } from 'react';
import useAxios from '../../redux/useAxios';


const HealthCheck = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  
  const api = useAxios();

  useEffect(() => {
    api.get('/health-check/')
      .then(response => {
        setStatus(response.data.status);
        setMessage(response.data.message);
      })
      .catch(error => {
        setStatus('Error'); 
        setMessage('Unable to reach backend.');
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Health Check</h1>
      <p>Status: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default HealthCheck;
