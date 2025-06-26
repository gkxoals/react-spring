import React, { useState } from 'react';

// useState: 상태관리, formData: 입력한 폼을 저장하는 객체, SetFormData: 그 데이터를 바꿔주는 함수
function App() {
  const [formData, setFormData] = useState({ 
    username: '',
    password: '',
    nickname: '',
    email: ''
  });

  const handleChange = (e) => { // 입력값 변경 처리
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => { // 폼 제출 처리
    e.preventDefault(); // 페이지 새로고침 막기

    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      alert('회원가입 완료: ' + JSON.stringify(data));
    })
    .catch(error => {
      alert('에러 발생: ' + error.message);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form id="signup" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="아이디를 입력하세요"
              required
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              required
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력하세요"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력하세요"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="signup-btn" id="signupButton">
            회원가입
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
