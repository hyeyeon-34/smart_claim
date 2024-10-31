import React from 'react'
import { useNavigate } from 'react-router-dom'; // 페이지 이동
import PropTypes from 'prop-types';
import './Button.css'; // 버튼 스타일을 위한 CSS 파일

const Button = ({ title, buttonType, buttonSize, link }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <button
      className={`button ${buttonType} ${buttonSize}`}
      onClick={handleButtonClick}
    >
      <p>{title}</p>
    </button>
  )
}

// PropTypes로 props 타입 정의
Button.propTypes = {
  title: PropTypes.string.isRequired,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  buttonSize: PropTypes.oneOf(['small', 'medium', 'large']),
  link: PropTypes.string
};

// 기본 props 값 설정
Button.defaultProps = {
  buttonType: 'primary',
  buttonSize: 'medium',
  link: '/'
};

export default Button