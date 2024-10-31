import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsurerLogin = ({ onLogin }) => {
  const [insurer_userid, setInsurerUserId] = useState('');
  const [insurer_password, setInsurerPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login/insurer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ insurer_userid, insurer_password }),
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
      <h2>보험사 직원 로그인</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={insurer_userid}
          onChange={(e) => setInsurerUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={insurer_password}
          onChange={(e) => setInsurerPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default InsurerLogin;
