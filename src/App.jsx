import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreload } from './states/authSlice';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';

export default function App() {
  const dispatch = useDispatch();
  const { isPreload } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncPreload());
  }, [dispatch]);

  if (isPreload) return null;

  return (
    <>
      {/* Loading berada di paling atas layer */}
      <Loading />

      {/* Navbar di luar container utama agar bisa lebar 100% ke samping layar */}
      <Navbar />

      {/* Container utama untuk konten (Thread, Login, dll) */}
      <main
        className="container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '85px 20px 40px 20px', // 85px di atas supaya konten tidak "tabrakan" dengan Navbar fixed
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>
    </>
  );
}
