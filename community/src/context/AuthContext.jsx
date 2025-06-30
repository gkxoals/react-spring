import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // localStorage에 토큰이 있으면 초기 상태를 true로 세팅
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const login = (token) => {
    localStorage.setItem('token', token);  // 로그인 시 토큰 저장
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');  // 로그아웃 시 토큰 삭제
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
