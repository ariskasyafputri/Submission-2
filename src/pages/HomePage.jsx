import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
import { asyncFetchThreads, setFilter, asyncCreateThread } from '../states/threadsSlice';

export default function HomePage() {
  const dispatch = useDispatch();

  // Ambil data dari Redux
  const { data, filter } = useSelector((state) => state.threads);
  const authUser = useSelector((state) => state.auth?.user);

  // State lokal untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  useEffect(() => {
    dispatch(asyncFetchThreads());
  }, [dispatch]);

  const onAddThread = (e) => {
    e.preventDefault();
    dispatch(asyncCreateThread({ title, body, category }));
    // Reset form dan tutup modal
    setTitle('');
    setCategory('');
    setBody('');
    setIsModalOpen(false);
  };

  // Ambil list kategori unik untuk dropdown
  const categories = [...new Set(data.map((t) => t.category))];
  const filteredThreads = filter ? data.filter((t) => t.category === filter) : data;

  return (
    <div style={{ position: 'relative', minHeight: '80vh', paddingBottom: '100px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#001f3f', marginBottom: '15px' }}>Diskusi Terbaru</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Filter Kategori:</label>
          <select
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
            style={selectStyle}
          >
            <option value="">Semua</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </header>

      {/* List Threads */}
      <div className="threads-list">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '50px' }}>Tidak ada thread ditemukan.</p>
        )}
      </div>

      {/* FAB (Floating Action Button) - Hanya muncul jika sudah login */}
      {authUser && (
        <button
          onClick={() => setIsModalOpen(true)}
          style={fabStyle}
          title="Buat Thread Baru"
        >
          {/* Icon Plus Simetris pakai CSS */}
          <div style={plusIconContainer}>
            <div style={horizontalLine}></div>
            <div style={verticalLine}></div>
          </div>
        </button>
      )}

      {/* MODAL POP-UP */}
      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
            }}>
              <h3 style={{ margin: 0, color: '#001f3f' }}>Buat Thread Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={isCloseHovered ? { ...closeBtnStyle, opacity: 0.6 } : closeBtnStyle}
                onMouseEnter={() => setIsCloseHovered(true)}
                onMouseLeave={() => setIsCloseHovered(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={onAddThread} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={inputGroup}>
                <input
                  placeholder="Judul Diskusi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={inputGroup}>
                <input
                  placeholder="Kategori (contoh: react, perkenalan)"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={inputGroup}>
                <textarea
                  placeholder="Apa yang ingin kamu bahas hari ini?"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows="6"
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
              <button type="submit" style={submitBtnStyle}>Kirim Diskusi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- STYLING OBJECTS ---

const selectStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  cursor: 'pointer',
  outline: 'none',
};
const fabStyle = {
  position: 'fixed',
  bottom: '40px',
  right: '40px',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#001f3f',
  border: 'none',
  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  cursor: 'pointer',
  zIndex: 999, // Di bawah Navbar dan Modal
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s',
  outline: 'none',
};
// Plus Icon CSS Components
const plusIconContainer = {
  position: 'relative',
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const horizontalLine = {
  position: 'absolute',
  width: '24px',
  height: '4px',
  backgroundColor: 'white',
  borderRadius: '2px',
};

const verticalLine = {
  position: 'absolute',
  width: '4px',
  height: '24px',
  backgroundColor: 'white',
  borderRadius: '2px',
};

// Modal Styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // HITAM TRANSPARAN (Netral)
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10001, // Tetap di atas Navbar
  padding: '20px',
  backdropFilter: 'blur(4px)', // Efek blur halus di belakangnya
};
const modalContentStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '550px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#001f3f', // Navy
  cursor: 'pointer',
  fontSize: '24px',
  fontWeight: 'bold',
  transition: '0.2s',
  padding: '5px',
};

const inputGroup = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid #eee',
  backgroundColor: '#f9f9f9',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const submitBtnStyle = {
  padding: '14px',
  backgroundColor: '#001f3f', // Navy
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '16px',
  marginTop: '10px',
  transition: 'background-color 0.2s',
};
