import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './Controller/StoreContext';
import GuestPage from './pages/GuestPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MemberHomePage from './pages/MemberHomePage';
import AdminPage from './pages/AdminPage';

function ProtectedRoute({ children, role }) {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.status !== role) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StoreProvider>
  );
}

function AppRoutes() {
  const { user } = useStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.status === 'admin' ? '/admin' : '/member'} replace />
          ) : (
            <GuestPage />
          )
        }
      />
      <Route path="/login" element={user ? <Navigate to={user.status === 'admin' ? '/admin' : '/member'} replace /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route path="/member" element={<ProtectedRoute role="member"><MemberHomePage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
