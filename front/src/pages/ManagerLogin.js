import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManagerLogin = ({ onLogin }) => {
  const [manager_userid, setManagerUserId] = useState('');
  const [manager_password, setManagerPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login/manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ manager_userid, manager_password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        onLogin();
        navigate('/');
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h2>상담사 로그인</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={manager_userid}
          onChange={(e) => setManagerUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={manager_password}
          onChange={(e) => setManagerPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default ManagerLogin;
