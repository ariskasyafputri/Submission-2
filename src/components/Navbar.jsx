import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authSlice';

export default function Navbar() {
  const authUser = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#ffffff' : '#b0c4de',
    textDecoration: 'none',
    fontSize: '14px', // Sedikit lebih besar
    fontWeight: location.pathname === path ? '600' : '400',
    padding: '8px 12px',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    transition: 'all 0.2s ease',
  });

  return (
    <header style={headerWrapper}>
      <nav style={navInnerStyle}>

        {/* GRUP KIRI: Navigasi Utama */}
        <div style={leftSectionStyle}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/leaderboard" style={getLinkStyle('/leaderboard')}>
            🏆 Leaderboard
          </Link>
        </div>

        {/* GRUP KANAN: User Profile & Auth */}
        <div style={rightSectionStyle}>
          {authUser ? (
            <div style={profileGroup}>
              <div style={userInfoStyle}>
                <img src={authUser.avatar} alt="" style={avatarStyle} />
                <span style={userNameStyle}>{authUser.name}</span>
              </div>
              <button onClick={onLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </div>
          ) : (
            <div style={authButtonGroup}>
              <Link to="/register" style={registerLinkStyle}>Register</Link>
              <Link to="/login" style={loginButtonStyle}>Login</Link>
            </div>
          )}
        </div>

      </nav>
    </header>
  );
}

// --- STYLING MODERN (HEIGHT 56PX) ---

const headerWrapper = {
  background: '#001f3f', // Navy
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
};

const navInnerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  height: '56px', // UKURAN PAS (Tidak kekecilan, tidak kegedean)
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
};

const leftSectionStyle = {
  display: 'flex',
  gap: '12px',
};

const rightSectionStyle = {
  display: 'flex',
  alignItems: 'center',
};

const authButtonGroup = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
};

const profileGroup = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  padding: '4px 10px',
  borderRadius: '20px',
};

const avatarStyle = {
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '1.5px solid rgba(255,255,255,0.3)',
  objectFit: 'cover',
};

const userNameStyle = {
  color: 'white',
  fontSize: '13px',
  fontWeight: '500',
  maxWidth: '120px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const logoutButtonStyle = {
  backgroundColor: 'transparent',
  color: '#ff7675',
  border: '1px solid #ff7675',
  padding: '5px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '600',
  transition: '0.2s',
};

const registerLinkStyle = {
  color: '#b0c4de',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
};

const loginButtonStyle = {
  backgroundColor: 'white',
  color: '#001f3f',
  textDecoration: 'none',
  padding: '7px 18px',
  borderRadius: '6px',
  fontSize: '13px',
  fontWeight: 'bold',
  transition: 'transform 0.1s active',
};
