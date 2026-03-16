// D:\ASAH\REACT EXPERT\forum-app - Copy\src\pages\LeaderboardPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncFetchLeaderboard } from '../states/leaderboardSlice';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncFetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="leaderboard-page">
      <h2>Klasemen Pengguna Aktif</h2>
      <div className="leaderboard-list">
        <header className="leaderboard-header">
          <span>Pengguna</span>
          <span>Skor</span>
        </header>
        {leaderboard.map((item) => (
          <div key={item.user.id} className="leaderboard-item" style={{
            display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={item.user.avatar} alt={item.user.name} width="35" style={{ borderRadius: '50%' }} />
              <span>{item.user.name}</span>
            </div>
            <strong>{item.score}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
