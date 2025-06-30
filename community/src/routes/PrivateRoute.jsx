// pages/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    alert('접근 권한이 없습니다. 로그인 후 이용해주세요.');
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
