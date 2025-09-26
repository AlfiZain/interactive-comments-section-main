import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import AppContent from './AppContent';
import userEvent from '@testing-library/user-event';
import AppProvider from '../providers/AppProvider';

const mockUser = {
  image: {
    png: '/images/avatars/image-amyrobson.png',
    webp: '/images/avatars/image-amyrobson.webp',
  },
  username: 'amyrobson',
};

const newCommentContent = 'This is a new comment';

const renderAppContent = () => {
  render(
    <AppProvider>
      <AppContent />
    </AppProvider>,
  );
};

describe('AppContent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render component correctly', () => {
    renderAppContent();

    expect(
      screen.getByText(
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      ),
    ).toBeInTheDocument();
  });

  it('add comment in CommentInput and new comment should display correctly', async () => {
    renderAppContent();

    await userEvent.type(
      screen.getByPlaceholderText(/add a comment.../i),
      newCommentContent,
    );

    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText(newCommentContent)).toBeInTheDocument();
  });

  it('show delete modal confirmation and delete the comment', async () => {
    renderAppContent();

    await userEvent.type(
      screen.getByPlaceholderText(/add a comment.../i),
      newCommentContent,
    );

    await userEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(newCommentContent)).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', {
      name: /delete comment/i,
    });
    await userEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(screen.getByRole('heading', { level: 2, name: /delete comment/i }));

    await userEvent.click(screen.getByRole('button', { name: /yes, delete/i }));
    expect(screen.queryByText(newCommentContent)).not.toBeInTheDocument();
  });

  it('show delete modal confirmation and delete the reply', async () => {
    renderAppContent();

    const replyContent = 'This is reply of comment content';

    const replyButtons = screen.getAllByRole('button', {
      name: /reply comment/i,
    });
    await userEvent.click(replyButtons[replyButtons.length - 1]);
    await userEvent.type(
      screen.getByPlaceholderText(/write your reply.../i),
      replyContent,
    );
    await userEvent.click(
      screen.getByRole('button', { name: /submit reply/i }),
    );

    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(replyContent)).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', {
      name: /delete comment/i,
    });
    await userEvent.click(deleteButtons[deleteButtons.length - 1]);
    expect(screen.getByRole('heading', { level: 2, name: /delete comment/i }));

    await userEvent.click(screen.getByRole('button', { name: /yes, delete/i }));
    expect(screen.queryByText(replyContent)).not.toBeInTheDocument();
  });
});
