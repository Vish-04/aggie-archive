// mocks useUser hook 
jest.mock('@auth0/nextjs-auth0/client', () => ({
  useUser: () => ({
    user: { name: 'Test User', email: 'test@example.com' },
    isLoading: false,
    error: null,
  }),
}));

// mocks createThread function from utils/db
jest.mock('../../utils/db', () => ({
  __esModule: true,
  fetchPosts: jest.fn().mockResolvedValue([]),
  createThread: jest.fn().mockResolvedValue({
    id: 'thread-1',
    name: 'Test Title',
    text: 'Test content'
  }),
  createPost: jest.fn().mockResolvedValue({
    thread_id: 'thread-1',
    class_id: 'class-1',
    content: 'Test content',
    user_email: 'user@test.com',

  }),
}));

// mocks userProvider 
jest.mock('@auth0/nextjs-auth0', () => ({
  UserProvider: ({ children }) => children,
}));



import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Comment from '../comments/Comment';
import DiscussionForm from '../comments/DiscussionForm';
import DiscussionThread from '../comments/DiscussionThread';
import { createPost } from '../../utils/db';


// COMMENT TESTS
//------UI-------
test('renders comment and user email correctly + hides title when it is a reply', () => {
  const comment = {
    user_email: 'cucai@ucdavis.edu',
    content: 'Test comment'
  }
  render(<Comment type="reply" title="placeholder" user_email={comment.user_email} content={comment.content} />);
  expect(screen.getByText('Test comment')).toBeInTheDocument();
  expect(screen.getByText("cucai@ucdavis.edu")).toBeInTheDocument();
  // title should be hidden
  expect(screen.queryByText("placeholder")).toHaveClass('hidden');
})

test('show title when type is default', () => {
  const thread = {
    user_email: 'cucai@ucdavis.edu',
    content: 'Test content',
    name: 'Test title'
  }
  render(<Comment title={thread.name} user_email={thread.user_email} content={thread.content} />);
  expect(screen.getByText('Test title')).toBeInTheDocument();
})

test('render profile picture', () => {
  render(
    <Comment user_email="cucai@ucdavis.edu" content="Testing" title="Test title" />
  );
  const profileImg = screen.getByAltText('user icon');
  expect(profileImg).toBeInTheDocument();
})

//------UX/interactions-------

test('clicking create thread calls createThread', async () => {
  const mockOnCreateThread = jest.fn();
  const mockOnCancel = jest.fn();

  render(
    <DiscussionForm
      classId="class-123"
      onCancel={mockOnCancel}
      onCreateThread={mockOnCreateThread}
    />
  );

  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText('Title'), 'Test Title');
  await user.type(screen.getByPlaceholderText('Text'), 'Test content');

  await user.click(screen.getByRole('button', { name: /create thread/i }));

  expect(mockOnCreateThread).toHaveBeenCalledTimes(1);
});

test('clicking post comment calls createPost', async () => {
  const thread = {
    id: 'thread-1',
    class_id: 'class-1',
    name: 'Test title',
    content: 'Test content',
  };
  render(<DiscussionThread thread={thread} />);
  const textarea = screen.getByPlaceholderText(/add comment/i);
  const user = userEvent.setup();
  await user.type(textarea, 'test comment');

  const postButton = await screen.findByRole('button', { name: /post comment/i });
  await user.click(postButton);

  expect(createPost).toHaveBeenCalledWith(
    'test comment',
    'test@example.com',
    'thread-1',
    'class-1'
  );

});

