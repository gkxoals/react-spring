import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BoardUpdate() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/board/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('글 작성 실패');
        return res.text();
      })
      .then(() => {
        alert('글 작성 완료!');
        navigate('/board'); // 글 목록 페이지로 이동
      })
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">작성</button>
      </form>
    </div>
  );
}

export default BoardUpdate;
