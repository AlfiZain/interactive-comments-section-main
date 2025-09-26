import { describe, expect, it } from 'vitest';
import { authUserReducer } from './authUserReducer';

const mockAuthUser = {
  image: {
    png: '/images/avatars/image-juliusomo.png',
    webp: '/images/avatars/image-juliusomo.webp',
  },
  username: 'juliusomo',
};

describe('authUserReducer', () => {
  it('should return initial state when given by unknown action', () => {
    const initialState = {};
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return authUser when given by RECEIVE_USER action', () => {
    const initialState = {};
    const action = {
      type: 'auth/RECEIVE_USER',
      payload: { authUser: mockAuthUser },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(mockAuthUser);
  });
});
