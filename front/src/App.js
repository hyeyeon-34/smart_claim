import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import ManagerLogin from './pages/ManagerLogin';
import InsurerLogin from './pages/InsurerLogin';
import Mypage from './pages/Mypage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 로그인 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태 유지
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('manager_userid'); // 필요에 따라 수정
    setIsLoggedIn(false);
    navigate('/userlogin'); // 로그인 페이지로 리디렉션
  };

  return (
    <div className="z-0 flex flex-col justify-between items-center min-h-screen w-full lg:min-w-[970px]">
      <nav className="z-[1000] header w-full border-[#e0e0e0] backdrop-blur-sm">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </nav>

      <div className="w-full lg:w-[80%] flex justify-center items-center px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/userlogin"
            element={<UserLogin onLogin={handleLogin} />}
          />
          <Route
            path="/managerlogin"
            element={<ManagerLogin onLogin={handleLogin} />}
          />
          <Route
            path="/insurerlogin"
            element={<InsurerLogin onLogin={handleLogin} />}
          />
          <Route path="/mypage" element={<Mypage />} />
          {/* 필요한 다른 경로를 여기에 추가 */}
        </Routes>
      </div>

      <footer className="footer translate-y-[-100%] h-5 w-full mt-2">
        <Footer />
      </footer>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
