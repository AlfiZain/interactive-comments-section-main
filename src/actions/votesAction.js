import { DOWNVOTE, UPVOTE } from '../constants/votesTypes';

export function upvoteComment(commentId) {
  return {
    type: UPVOTE,
    payload: { commentId },
  };
}

export function downvoteComment(commentId) {
  return {
    type: DOWNVOTE,
    payload: { commentId },
  };
}
