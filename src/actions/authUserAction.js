import { RECEIVE_USER } from '../constants/authUserTypes';

export function receiveAuthUser(authUser) {
  return {
    type: RECEIVE_USER,
    payload: { authUser },
  };
}
