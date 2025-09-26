import { describe, expect, it } from 'vitest';
import { commentInteractionReducer } from './commentInteractionReducer';

const mockCommentId = 'comments-1';
const mockReplyId = 'replies-1';

describe('commentInteractionReducer', () => {
  it('should return initial state when given by unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    const nextState = commentInteractionReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return activeReplyId with payload id', () => {
    const initialState = {};
    const action = {
      type: 'comments/OPEN_REPLY',
      payload: { id: mockCommentId },
    };

    const expectedResult = {
      activeReplyId: mockCommentId,
      activeEditId: null,
      activeDeleteId: null,
    };

    const nextState = commentInteractionReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return activeEditId with payload id', () => {
    const initialState = {};
    const action = {
      type: 'comments/OPEN_EDIT',
      payload: { id: mockCommentId },
    };

    const expectedResult = {
      activeEditId: mockCommentId,
      activeReplyId: null,
      activeDeleteId: null,
    };

    const nextState = commentInteractionReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return activeDeleteId with commentId', () => {
    const initialState = {};
    const action = {
      type: 'comments/OPEN_DELETE',
      payload: {
        commentId: mockCommentId,
        replyId: null,
      },
    };

    const expectedResult = {
      activeDeleteId: { commentId: mockCommentId, replyId: null },
      activeEditId: null,
      activeReplyId: null,
    };

    const nextState = commentInteractionReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return activeDeleteId with commentId and replyId', () => {
    const initialState = {};
    const action = {
      type: 'comments/OPEN_DELETE',
      payload: {
        commentId: mockCommentId,
        replyId: mockReplyId,
      },
    };

    const expectedResult = {
      activeDeleteId: { commentId: mockCommentId, replyId: mockReplyId },
      activeEditId: null,
      activeReplyId: null,
    };

    const nextState = commentInteractionReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });

  it('should return activeReplyId, activeEditId and activeDeleteId with null', () => {
    const initialState = {};
    const action = {
      type: 'comments/CLOSE_ALL',
    };

    const expectedResult = {
      activeReplyId: null,
      activeEditId: null,
      activeDeleteId: null,
    };

    const nextState = commentInteractionReducer(initialState, action);

    expect(nextState).toEqual(expectedResult);
  });
});
