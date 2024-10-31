import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/userlogin" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (allowedRoles.includes(userRole)) {
      return element;
    } else {
      alert('접근 권한이 없습니다.');
      return <Navigate to="/" />;
    }
  } catch (error) {
    alert('토큰이 유효하지 않습니다. 다시 로그인해 주세요.');
    localStorage.removeItem('token');
    return <Navigate to="/userlogin" />;
  }
};

export default ProtectedRoute;
