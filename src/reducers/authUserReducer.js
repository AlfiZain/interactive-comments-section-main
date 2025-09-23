import { RECEIVE_USER } from '../constants/authUserTypes';

export function authUserReducer(authUser, action) {
  switch (action.type) {
    case RECEIVE_USER: {
      return action.payload.authUser;
    }

    default:
      return authUser;
  }
}
