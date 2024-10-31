import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav_Category = ({ title, link }) => {
  const navigate = useNavigate();

  const navCategoryClick = () => {
    navigate(link);
  };

  return (
    <div className="nav-category" onClick={navCategoryClick}>
      <p className="nav-category-title">{title}</p>
    </div>
  )
}

export default Nav_Category