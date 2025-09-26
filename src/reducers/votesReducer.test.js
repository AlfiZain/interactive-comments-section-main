import { describe, it, expect } from 'vitest';
import { votesReducer } from './votesReducer';

describe('votesReducer', () => {
  const id = 'comment-1';

  it('should return initial state when given by unknown action', () => {
    const initialState = { [id]: { vote: 'upvote', offset: 1 } };
    const action = { type: 'UNKNOWN', payload: { id } };

    const nextState = votesReducer(initialState, action);

    expect(nextState).toBe(initialState);
  });

  it('should upvote when currentVote is none', () => {
    const initialState = {};
    const action = {
      type: 'votes/UPVOTE',
      payload: { id },
    };

    const nextState = votesReducer(initialState, action);

    expect(nextState[id]).toEqual({ vote: 'upvote', offset: 1 });
  });

  it('should upvote when currentVote is downvote', () => {
    const initialState = { [id]: { vote: 'downvote', offset: -1 } };
    const action = {
      type: 'votes/UPVOTE',
      payload: { id },
    };

    const nextState = votesReducer(initialState, action);

    expect(nextState[id]).toEqual({ vote: 'upvote', offset: 1 });
  });

  it('should remove upvote (toggle) when currentVote is upvote', () => {
    const initialState = { [id]: { vote: 'upvote', offset: 1 } };
    const action = {
      type: 'votes/UPVOTE',
      payload: { id },
    };

    const nextState = votesReducer(initialState, action);

    expect(nextState[id]).toEqual({ vote: 'none', offset: 0 });
  });

  it('should downvote when currentVote is none', () => {
    const initialState = {};
    const action = {
      type: 'votes/DOWNVOTE',
      payload: { id },
    };

    const nextState = votesReducer(initialState, action);

    expect(nextState[id]).toEqual({ vote: 'downvote', offset: -1 });
  });

  it('should downvote when currentVote is upvote', () => {
    const initialState = { [id]: { vote: 'upvote', offset: 1 } };
    const action = {
      type: 'votes/DOWNVOTE',
      payload: { id },
    };

    const nextState = votesReducer(initialState, action);

    expect(nextState[id]).toEqual({ vote: 'downvote', offset: -1 });
  });

  it('should remove downvote (toggle) when currentVote is downvote', () => {
    const initialState = { [id]: { vote: 'downvote', offset: -1 } };
    const action = {
      type: 'votes/DOWNVOTE',
      payload: { id },
    };

    const nextState = votesReducer(initialState, action);

    expect(nextState[id]).toEqual({ vote: 'none', offset: 0 });
  });
});
