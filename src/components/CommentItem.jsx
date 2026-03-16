// D:\ASAH\REACT EXPERT\forum-app - Copy\src\components\CommentItem.jsx
export default function CommentItem({ comment }) {
  return (
    <div className="comment-card">
      <div>{comment.content}</div>
      <div className="comment-meta">
        {comment.owner?.name} •{' '}
        {new Date(comment.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
