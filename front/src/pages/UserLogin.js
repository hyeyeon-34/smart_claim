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
      const response = await fetch('http://localhost:3000/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, birthdate, user_pn }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin(); // 로그인 상태 변경
        navigate('/mypage'); // 고객 대시보드로 이동 (필요에 따라 수정)
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
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
        />
        <input
          type="date"
          placeholder="생년월일"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={user_pn}
          onChange={(e) => setUserPn(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default UserLogin;
