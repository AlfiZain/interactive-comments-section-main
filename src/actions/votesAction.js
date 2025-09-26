import { DOWNVOTE, UPVOTE } from '../constants/votesTypes';

export function upvoteComment(id) {
  return {
    type: UPVOTE,
    payload: { id },
  };
}

export function downvoteComment(id) {
  return {
    type: DOWNVOTE,
    payload: { id },
  };
}
