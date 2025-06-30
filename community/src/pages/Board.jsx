import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/Logoutbutton';

function Board() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('/board/list', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        // 배열인지 확인
        if (Array.isArray(data)) {
          setBoards(data);
        } else if (Array.isArray(data.boards)) {
          setBoards(data.boards);
        } else {
          setBoards([]); // fallback
          console.error('예상치 못한 응답:', data);
        }
      })
      .catch(err => {
        console.error('불러오기 실패:', err);
        setBoards([]); // 에러 시에도 빈 배열로
      });
  }, []);

  return (
    <div>
      <h2>게시판 페이지</h2>
      <LogoutButton />

      <div style={{ marginTop: '20px' }}>
        <Link to="/board/update">
          <button>글쓰기</button>
        </Link>
      </div>

      <ul style={{ marginTop: '20px' }}>
        {boards.map(board => (
          <li key={board.id}>
            <strong>{board.title}</strong>
            <p>{board.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;
