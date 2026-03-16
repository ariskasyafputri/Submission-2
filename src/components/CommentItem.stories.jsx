import CommentItem from './CommentItem';

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
};

export const Default = () => (
  <CommentItem
    comment={{
      content: 'This is comment example',
      owner: { name: 'Farhan' },
      createdAt: new Date().toISOString(),
    }}
  />
);