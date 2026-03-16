// D:\ASAH\REACT EXPERT\forum-app - Copy\src\components\VoteButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncToggleVoteThread } from '../states/threadsSlice';
import { asyncToggleVoteComment } from '../states/threadDetailSlice';

function VoteButton({
  id,
  threadId,
  upVotes = [],
  downVotes = [],
  authUser,
  type, // 'thread' atau 'comment'
}) {
  const dispatch = useDispatch();

  const isUpVoted = authUser ? upVotes.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotes.includes(authUser.id) : false;

  const onUpVote = () => {
    if (!authUser) return alert('Login dulu');
    if (type === 'thread') {
      dispatch(asyncToggleVoteThread({ threadId: id, type: 'up' }));
    } else {
      dispatch(asyncToggleVoteComment({ threadId, commentId: id, type: 'up' }));
    }
  };

  const onDownVote = () => {
    if (!authUser) return alert('Login dulu');
    if (type === 'thread') {
      dispatch(asyncToggleVoteThread({ threadId: id, type: 'down' }));
    } else {
      dispatch(asyncToggleVoteComment({ threadId, commentId: id, type: 'down' }));
    }
  };

  const baseButtonStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  };

  return (
    <div className="vote-btn" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <button
        type="button"
        onClick={onUpVote}
        style={{
          ...baseButtonStyle,
          backgroundColor: isUpVoted ? '#2ea44f' : 'white',
          color: isUpVoted ? 'white' : '#555',
          borderColor: isUpVoted ? '#2ea44f' : '#ddd',
        }}
        title={isUpVoted ? 'Batal Suka' : 'Suka'}
      >
        👍 {upVotes.length}
      </button>

      <button
        type="button"
        onClick={onDownVote}
        style={{
          ...baseButtonStyle,
          backgroundColor: isDownVoted ? '#cb2431' : 'white',
          color: isDownVoted ? 'white' : '#555',
          borderColor: isDownVoted ? '#cb2431' : '#ddd',
        }}
        title={isDownVoted ? 'Batal Tidak Suka' : 'Tidak Suka'}
      >
        👎 {downVotes.length}
      </button>
    </div>
  );
}

export default VoteButton;
