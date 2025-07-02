import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Board from './pages/Board';
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './routes/PublicRoute';
import Boardcreate from './pages/BoardCreate';
import PrivateRoute from './routes/PrivateRoute';
import NotFound from './pages/NotFound';
import BoardEdit from './pages/BoardEdit'; // 수정 페이지 import 추가

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/board" replace />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/board"
            element={
              <PrivateRoute>
                <Board />
              </PrivateRoute>
            }
          />
          <Route
            path="/board/create"
            element={
              <PrivateRoute>
                <Boardcreate />
              </PrivateRoute>
            }
          />
          {/* 게시글 수정 라우트 추가 */}
          <Route
            path="/board/edit/:id"
            element={
              <PrivateRoute>
                <BoardEdit />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;