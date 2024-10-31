import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [user_pn, setUserPn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 전화번호 자동 포맷 함수
  const handlePhoneNumberChange = (e) => {
    let formattedNumber = e.target.value.replace(/\D/g, ''); // 숫자만 남기기
    if (formattedNumber.length <= 3) {
      setUserPn(formattedNumber);
    } else if (formattedNumber.length <= 7) {
      setUserPn(`${formattedNumber.slice(0, 3)}-${formattedNumber.slice(3)}`);
    } else {
      setUserPn(
        `${formattedNumber.slice(0, 3)}-${formattedNumber.slice(
          3,
          7
        )}-${formattedNumber.slice(7, 11)}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, user_pn }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin(); // 로그인 상태 변경
        navigate('/mypage'); // 고객 대시보드로 이동
      } else {
        setErrorMessage(data.error); // 오류 메시지 처리
      }
    } catch (error) {
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.'); // 일반적인 오류 처리
    }
  };

  return (
    <div>
      <h2>고객 로그인</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="성명을 입력하세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="전화번호 (예: 010-1234-5678)"
          value={user_pn}
          onChange={handlePhoneNumberChange}
          maxLength="13" // 형식에 맞춘 최대 길이 제한
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default UserLogin;
