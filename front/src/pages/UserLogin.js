import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [user_pn, setUserPn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login/user', {
        // HTTP로 변경
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, birthdate, user_pn }),
      });

      const data = await response.json();

      if (response.ok) {
        // 응답 상태가 200일 때
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
          required // 필수 입력 필드
        />
        <input
          type="text" // 날짜 입력 필드로 변경
          placeholder="생년월일"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required // 필수 입력 필드
        />
        <input
          type="text"
          placeholder="전화번호"
          value={user_pn}
          onChange={(e) => setUserPn(e.target.value)}
          required // 필수 입력 필드
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default UserLogin;
