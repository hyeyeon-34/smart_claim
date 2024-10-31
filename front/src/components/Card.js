import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ title, description, link }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(link);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-title">{title}</div>
      <div className="card-description">{description}</div>
    </div>
  );
}

export default Card;
