import { render, screen } from '@testing-library/react';
import CommentItem from '../components/CommentItem';

describe('CommentItem component', () => {
  test('should render comment content', () => {
    const comment = {
      content: 'Hello world',
      owner: { name: 'Farhan' },
      createdAt: new Date().toISOString(),
    };

    render(<CommentItem comment={comment} />);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
