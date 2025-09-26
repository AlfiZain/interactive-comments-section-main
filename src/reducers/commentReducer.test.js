import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { commentReducer } from './commentReducer';

const mockReply = {
  id: 'replies-1',
  content: 'Reply content',
  createdAt: '2025-09-16T09:15:30.123Z',
  score: 4,
  replyingTo: 'maxblagun',
  user: {
    image: {
      png: '/images/avatars/image-ramsesmiron.png',
      webp: '/images/avatars/image-ramsesmiron.webp',
    },
    username: 'ramsesmiron',
  },
};

const mockComment = {
  id: 'comments-1',
  content: 'Comment content',
  createdAt: '2025-08-23T09:15:30.123Z',
  score: 12,
  user: {
    image: {
      png: '/images/avatars/image-amyrobson.png',
      webp: '/images/avatars/image-amyrobson.webp',
    },
    username: 'amyrobson',
  },
  replies: [mockReply],
};

const mockUser = {
  image: {
    png: '/images/avatars/image-juliusomo.png',
    webp: '/images/avatars/image-juliusomo.webp',
  },
  username: 'juliusomo',
};

const mockContent = 'This is mock content';
const mockDate = new Date('2025-09-24T12:00:00Z');
const mockMathRandom = 0.123456789;
const mockCommentId = 'comments-1';
const mockReplyId = 'replies-1';
const mockReplyingTo = 'user';

describe('commentReducer', () => {
  beforeAll(() => {
    vi.setSystemTime(mockDate);

    vi.spyOn(Math, 'random').mockReturnValue(mockMathRandom);
  });

  afterAll(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return initial state when given by unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return comments when given by RECEIVE_COMMENTS action', () => {
    const initialState = {};
    const action = {
      type: 'comments/RECEIVE_COMMENTS',
      payload: { comments: [mockComment] },
    };

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual([mockComment]);
  });

  it('should return comments with new comment when given by ADD_COMMENT action', () => {
    const initialState = [mockComment];
    const id = `comments-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = new Date().toISOString();
    const action = {
      type: 'comments/ADD_COMMENT',
      payload: {
        comment: {
          id,
          content: mockContent,
          createdAt,
          score: 0,
          user: mockUser,
          replies: [],
        },
      },
    };

    const expectedResult = [
      ...initialState,
      {
        id: `comments-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        content: mockContent,
        createdAt: new Date().toISOString(),
        score: 0,
        user: mockUser,
        replies: [],
      },
    ];

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return comments with edited comment when given by EDIT_COMMENT action', () => {
    const initialState = [mockComment];
    const action = {
      type: 'comments/EDIT_COMMENT',
      payload: { id: mockCommentId, content: mockContent },
    };

    const expectedResult = [{ ...mockComment, content: mockContent }];

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return comments without deleted comment when given by DELETE_COMMENT action', () => {
    const initialState = [mockComment];
    const action = {
      type: 'comments/DELETE_COMMENT',
      payload: { id: mockCommentId },
    };

    const expectedResult = [];

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return comments with added new reply when given by ADD_REPLY action', () => {
    const initialState = [mockComment];
    const id = `replies-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const createdAt = new Date().toISOString();

    const action = {
      type: 'comments/ADD_REPLY',
      payload: {
        parentId: mockCommentId,
        reply: {
          id,
          content: mockContent,
          createdAt,
          score: 0,
          replyingTo: mockReplyingTo,
          user: mockUser,
        },
      },
    };

    const expectedResult = [
      {
        ...mockComment,
        replies: [
          mockReply,
          {
            id: `replies-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            content: mockContent,
            createdAt: new Date().toISOString(),
            score: 0,
            replyingTo: mockReplyingTo,
            user: mockUser,
          },
        ],
      },
    ];

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return comments with edited reply when given by EDIT_REPLY action', () => {
    const initialState = [mockComment];
    const action = {
      type: 'comments/EDIT_REPLY',
      payload: { id: mockReplyId, content: mockContent },
    };

    const expectedResult = [
      {
        ...mockComment,
        replies: [
          {
            ...mockReply,
            content: mockContent,
          },
        ],
      },
    ];

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return comments without deleted reply when given by DELETE_REPLY action', () => {
    const initialState = [mockComment];
    const action = {
      type: 'comments/DELETE_REPLY',
      payload: {
        commentId: mockCommentId,
        replyId: mockReplyId,
      },
    };

    const expectedResult = [
      {
        ...mockComment,
        replies: [],
      },
    ];

    const nextState = commentReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });
});
