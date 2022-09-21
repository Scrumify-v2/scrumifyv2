import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleClick = () => {
    return navigate('/login');
  };

  return (
    <div>
      <div>Dashboard</div>
      <button type='button' onClick={() => handleClick()}>
        Log In
      </button>
    </div>
  );
}
