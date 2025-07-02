import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../components/Logoutbutton';

function Board() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/board/list', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBoards(data);
        } else if (Array.isArray(data.boards)) {
          setBoards(data.boards);
        } else {
          setBoards([]);
          console.error('예상치 못한 응답:', data);
        }
      })
      .catch(err => {
        console.error('불러오기 실패:', err);
        setBoards([]);
      });
  }, []);

  const handleEdit = (board) => {
    const id = board.id || board.boardId;
    navigate(`/board/edit/${id}`);
  };

  const handleDelete = (board) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const id = board.id || board.boardId;
    fetch(`/board/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    
      }
    
    })
      .then(res => {
        if (res.status === 204) {
          setBoards(boards.filter(b => (b.id || b.boardId) !== id));
          alert("삭제 완료!");
        } else {
          return res.text().then(msg => { throw new Error(msg); });
        }
      })
      .catch(err => alert("삭제 실패: " + err.message));
  };
  return (
    <div>
      <h2>게시판 페이지</h2>
      <LogoutButton />

      <div style={{ marginTop: '20px' }}>
        <Link to="/board/create">
          <button>글쓰기</button>
        </Link>
      </div>

      <ul style={{ marginTop: '20px' }}>
        {boards.map(board => (
          <li key={board.id || board.boardId} style={{ marginBottom: "20px" }}>
            <strong>{board.title}</strong>
            <span style={{ marginLeft: "10px", color: "#888" }}>
              작성자: {board.authorNickname}
            </span>
            <p>{board.content}</p>
            <button onClick={() => handleEdit(board)} style={{ marginTop: "5px" }}>수정</button>
            
            <button 
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(board)}
            >
              삭제
            </button>
           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Board;