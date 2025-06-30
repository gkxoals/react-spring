import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();             // Context에서 로그아웃 상태 변경 및 토큰 삭제
    navigate('/login');   // 로그인 페이지로 이동
  };

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
}

export default LogoutButton;
