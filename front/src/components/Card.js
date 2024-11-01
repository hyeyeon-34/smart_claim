import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/logo.PNG'; // 로고 이미지 경로
import Button from '../components/Button';

// add props cardImage, 
function Card({ title, description, link }) { 
  const navigate = useNavigate();

  // const handleCardClick = () => {
  //   navigate(link);
  // };
  return (
    // <div className="card" onClick={handleCardClick}>
    <div className="card" >
      {/* 카드 이미지 경로로 대체 */}
      <img className="card-image" src={logoImage} alt="Logo" />
      <div className="card-title text-xl font-semibold pt-4">{title}</div>
      <div className="card-description py-1">{description}</div>
      {/* 버튼을 오른쪽에 배치하기 위한 flex 레이아웃 */}
      <div className="flex justify-end">
        <Button title="이동" buttonType="secondary" buttonSize="small" link={link} />
      </div>
    </div>
  );
}

export default Card;
