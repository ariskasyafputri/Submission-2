import React from 'react';
import { useSelector } from 'react-redux';

export default function Loading() {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div style={loadingContainerStyle}>
      <div style={loadingBadgeStyle}>
        <div className="spinner-mini"></div>
        <span>Memuat...</span>
      </div>
    </div>
  );
}

// --- STYLING (FLOATING UNDER NAVBAR) ---

const loadingContainerStyle = {
  position: 'fixed',
  top: '80px', // JARAK: Navbar (65px) + Jarak (15px) = 80px
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  zIndex: 9998,
  pointerEvents: 'none',
};

const loadingBadgeStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: '#001f3f', // Navy
  padding: '6px 14px',
  fontSize: '12px',
  fontWeight: '600',
  borderRadius: '20px', // Bikin kapsul biar manis
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid rgba(0, 31, 63, 0.1)', // Border navy tipis
};
