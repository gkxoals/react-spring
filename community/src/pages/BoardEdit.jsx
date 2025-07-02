import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BoardEdit() {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  // 게시글 데이터 불러오기
  useEffect(() => {
    fetch(`/board/${id}`, {
      method: 'POST', // 서버에서 GET이 아니라 POST로 받는 경우
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setFormData({ title: data.title, content: data.content });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    fetch('/board/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        authorId: Number(userId),
        boardId: Number(id),
        ...formData
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('수정 실패');
        return res.json();
      })
      .then(() => {
        alert('수정 완료!');
        navigate('/board');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div>
      <h2>게시글 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>내용</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default BoardEdit;