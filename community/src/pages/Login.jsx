import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // 페이지 이동용 훅
import { useAuth } from '../context/AuthContext';  // 경로는 실제 위치에 맞게 조정


function Login() {
const { login } =useAuth();

  const [formData, setFormData] = useState({
    nickname: '',
    password: ''
  });

  const navigate = useNavigate();  // 페이지 이동을 위해 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('로그인 실패');
        return res.json();
      })
      .then(data => {
        alert('로그인 성공');
        login(data.token);  // 로그인 상태 및 토큰 저장 처리
        navigate('/board');
      })
      .catch(err => {
        alert(err.message);
      });
  };
  

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">로그인</button>
      </form>

      <div>
        <button onClick={() => navigate('/signup')}>회원가입 이동</button>
      </div>
    </div>
  );
}

export default Login;
