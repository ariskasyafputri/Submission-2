import CommentItem from './CommentItem';

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
};

export const Default = () => (
  <CommentItem
    comment={{
      content: 'Ini contoh komen yang akan muncul',
      owner: { name: 'Ariska' },
      createdAt: new Date().toISOString(),
    }}
  />
);
