import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import CommentProvider from '../providers/CommentProvider';
import AuthUserProvider from '../providers/AuthUserProvider';
import CommentInteractionProvider from '../providers/CommentInteractionProvider';
import VotesProvider from '../providers/VotesProvider';
import userEvent from '@testing-library/user-event';
import CommentList from './CommentList';

const mockReply = {
  id: 'replies-1',
  content: 'Reply content',
  createdAt: '2025-09-16T09:15:30.123Z',
  score: 0,
  replyingTo: 'juliusomo',
  user: {
    image: {
      png: '/images/avatars/image-amyrobson.png',
      webp: '/images/avatars/image-amyrobson.webp',
    },
    username: 'amyrobson',
  },
};

const mockReplyCurrentUser = {
  id: 'replies-2',
  content: 'Reply content current user',
  createdAt: '2025-09-16T09:15:30.123Z',
  score: 0,
  replyingTo: 'amyrobson',
  user: {
    image: {
      png: '/images/avatars/image-juliusomo.png',
      webp: '/images/avatars/image-juliusomo.webp',
    },
    username: 'juliusomo',
  },
};

const mockComment = {
  id: 'comments-1',
  content: 'Comment content',
  createdAt: '2025-08-23T09:15:30.123Z',
  score: 0,
  user: {
    image: {
      png: '/images/avatars/image-amyrobson.png',
      webp: '/images/avatars/image-amyrobson.webp',
    },
    username: 'amyrobson',
  },
  replies: [mockReplyCurrentUser],
};

const mockCommentCurrentUser = {
  id: 'comments-2',
  content: 'Comment content current user',
  createdAt: '2025-08-23T09:15:30.123Z',
  score: 0,
  user: {
    image: {
      png: '/images/avatars/image-juliusomo.png',
      webp: '/images/avatars/image-juliusomo.webp',
    },
    username: 'juliusomo',
  },
  replies: [mockReply],
};

const mockCommentWithoutReplies = {
  id: 'comments-2',
  content: 'Comment content current user',
  createdAt: '2025-08-23T09:15:30.123Z',
  score: 0,
  user: {
    image: {
      png: '/images/avatars/image-juliusomo.png',
      webp: '/images/avatars/image-juliusomo.webp',
    },
    username: 'juliusomo',
  },
  replies: [],
};

const mockAuthUser = {
  image: {
    png: '/images/avatars/image-juliusomo.png',
    webp: '/images/avatars/image-juliusomo.webp',
  },
  username: 'juliusomo',
};

const mockUser = {
  image: {
    png: '/images/avatars/image-amyrobson.png',
    webp: '/images/avatars/image-amyrobson.webp',
  },
  username: 'amyrobson',
};

const renderCommentList = (initialUser, initialComment, initialVotes = {}) => {
  render(
    <AuthUserProvider initialUser={initialUser}>
      <CommentProvider initialComment={initialComment}>
        <CommentInteractionProvider>
          <VotesProvider initialVotes={initialVotes}>
            <CommentList />
          </VotesProvider>
        </CommentInteractionProvider>
      </CommentProvider>
    </AuthUserProvider>,
  );
};

describe('CommentList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render components correctly', () => {
    renderCommentList(mockAuthUser, [mockComment]);

    expect(screen.getByText('Comment content')).toBeInTheDocument();
  });

  it('should render multiple Comment Item correctly', () => {
    renderCommentList(mockAuthUser, [mockComment, mockCommentCurrentUser]);

    expect(screen.getByText('Comment content')).toBeInTheDocument();
    expect(
      screen.getByText('Comment content current user'),
    ).toBeInTheDocument();
  });

  it('should be able to reply the comment', async () => {
    renderCommentList(mockAuthUser, [mockComment]);
    const replyContent = 'This is reply of comment content';

    await userEvent.click(
      screen.getByRole('button', {
        name: /reply comment/i,
      }),
    );

    await userEvent.type(
      screen.getByPlaceholderText(/write your reply.../i),
      replyContent,
    );

    await userEvent.click(
      screen.getByRole('button', { name: /submit reply/i }),
    );

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(replyContent)).toBeInTheDocument();
  });

  it('should be able to reply the reply', async () => {
    renderCommentList(mockAuthUser, [mockCommentCurrentUser]);
    const replyContent = 'This is reply of reply content';

    await userEvent.click(
      screen.getByRole('button', {
        name: /reply comment/i,
      }),
    );

    await userEvent.type(
      screen.getByPlaceholderText(/write your reply.../i),
      replyContent,
    );

    await userEvent.click(
      screen.getByRole('button', { name: /submit reply/i }),
    );

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(replyContent)).toBeInTheDocument();
  });

  it('should be able to edit the comment', async () => {
    renderCommentList(mockAuthUser, [mockCommentCurrentUser]);

    await userEvent.click(
      screen.getByRole('button', { name: /edit comment/i }),
    );

    await userEvent.type(
      screen.getByPlaceholderText(/update your comment.../i),
      ' has been update',
    );

    await userEvent.click(
      screen.getByRole('button', { name: /submit update/i }),
    );

    expect(
      screen.getByText(`${mockCommentCurrentUser.content} has been update`),
    ).toBeInTheDocument();
  });

  it('should be able to edit the reply', async () => {
    renderCommentList(mockAuthUser, [mockCommentCurrentUser]);

    await userEvent.click(
      screen.getByRole('button', { name: /edit comment/i }),
    );

    await userEvent.type(
      screen.getByPlaceholderText(/update your comment.../i),
      ' has been update',
    );

    await userEvent.click(
      screen.getByRole('button', { name: /submit update/i }),
    );

    expect(
      screen.getByText(`${mockCommentCurrentUser.content} has been update`),
    ).toBeInTheDocument();
  });

  it('should increments vote score when + button clicked', async () => {
    renderCommentList(mockAuthUser, [mockCommentWithoutReplies]);
    await userEvent.click(screen.getByRole('button', { name: 'upvote' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should neutralize vote score when + button clicked twice', async () => {
    renderCommentList(mockAuthUser, [mockCommentWithoutReplies]);
    await userEvent.click(screen.getByRole('button', { name: 'upvote' }));
    expect(screen.getByText('1')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'upvote' }));
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should switches from downvote to upvote correctly', async () => {
    renderCommentList(mockAuthUser, [mockCommentWithoutReplies]);
    await userEvent.click(screen.getByRole('button', { name: 'downvote' }));
    expect(screen.getByText('-1')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'upvote' }));
    expect(screen.queryByText('-1')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should decrements vote score when - button clicked', async () => {
    renderCommentList(mockAuthUser, [mockCommentWithoutReplies]);
    await userEvent.click(screen.getByRole('button', { name: 'downvote' }));
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('should neutralize vote score when - button clicked twice', async () => {
    renderCommentList(mockAuthUser, [mockCommentWithoutReplies]);
    await userEvent.click(screen.getByRole('button', { name: 'downvote' }));
    expect(screen.getByText('-1')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'downvote' }));
    expect(screen.queryByText('-1')).not.toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should switches from upvote to downvote correctly', async () => {
    renderCommentList(mockAuthUser, [mockCommentWithoutReplies]);
    await userEvent.click(screen.getByRole('button', { name: 'upvote' }));
    expect(screen.getByText('1')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'downvote' }));
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByText('-1')).toBeInTheDocument();
  });
});
