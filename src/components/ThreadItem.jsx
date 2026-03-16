import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncToggleVoteThread } from '../states/threadsSlice';

// --- STYLING OBJECTS (Tetap Sama) ---
const cardStyle = {
  border: '1px solid #eee',
  padding: '20px',
  marginBottom: '15px',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  backgroundColor: 'white',
};

const titleStyle = {
  margin: '0 0 10px 0',
  fontSize: '18px', // Dikecilkan sedikit agar lebih rapi
  fontWeight: 'bold',
  cursor: 'pointer',
};

const bodyStyle = {
  color: '#444',
  fontSize: '14px', // Disesuaikan agar pas dengan detail page
  lineHeight: '1.6',
  marginBottom: '15px',
  display: '-webkit-box', // Teknik agar teks rapi jika panjang
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const metaStyle = {
  fontSize: '12px',
  color: '#888',
  marginBottom: '15px',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
};

const avatarStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  border: '1px solid #ddd',
  objectFit: 'cover',
};

const categoryBadgeStyle = {
  backgroundColor: '#f0f2f5',
  padding: '2px 10px',
  borderRadius: '12px',
  color: '#001f3f',
  fontWeight: '600',
};

const footerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  borderTop: '1px solid #f0f2f5',
  paddingTop: '15px',
};

const voteButtonStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 16px',
  borderRadius: '20px',
  border: '1px solid',
  fontSize: '13px',
  transition: 'all 0.2s ease',
  fontWeight: '600',
};

const commentInfoStyle = {
  fontSize: '13px',
  color: '#555',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export default function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.user);
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  const isUpVoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;

  // FUNGSI PEMBERSIH HTML: Menghapus tag agar tidak muncul teks <div> di HomePage
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleVote = () => {
    if (!authUser) {
      alert('Login dulu boss, baru bisa vote');
      return;
    }
    dispatch(asyncToggleVoteThread({ threadId: thread.id, type: 'up' }));
  };

  // Bersihkan teks body sebelum ditampilkan sebagai cuplikan
  const cleanBody = stripHtml(thread.body);

  return (
    <div style={cardStyle}>
      <Link
        to={`/threads/${thread.id}`}
        style={{
          textDecoration: isTitleHovered ? 'underline' : 'none',
          color: '#001f3f',
        }}
        onMouseEnter={() => setIsTitleHovered(true)}
        onMouseLeave={() => setIsTitleHovered(false)}
      >
        <h3 style={titleStyle}>{thread.title}</h3>
      </Link>

      {/* Tampilkan cuplikan teks yang sudah BERSIH dari tag HTML */}
      <p style={bodyStyle}>
        {cleanBody.length > 150 ? `${cleanBody.slice(0, 150)}...` : cleanBody}
      </p>

      <div style={metaStyle}>
        <img
          src={thread.owner?.avatar}
          alt={thread.owner?.name}
          style={avatarStyle}
        />
        <span style={{ fontWeight: '500' }}>{thread.owner?.name}</span>
        <span>•</span>
        <span>{new Date(thread.createdAt).toLocaleDateString('id-ID')}</span>
        <span>•</span>
        <span style={categoryBadgeStyle}>#{thread.category}</span>
      </div>

      <div style={footerStyle}>
        <button
          type="button"
          onClick={handleVote}
          style={{
            ...voteButtonStyle,
            backgroundColor: isUpVoted ? '#2ea44f' : 'white',
            color: isUpVoted ? 'white' : '#555',
            borderColor: isUpVoted ? '#2ea44f' : '#ddd',
          }}
        >
          👍 {thread.upVotesBy.length}
        </button>

        <span style={commentInfoStyle}>
          💬 {thread.totalComments} <span style={{ color: '#888' }}>Komentar</span>
        </span>
      </div>
    </div>
  );
}
