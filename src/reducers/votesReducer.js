import { DOWNVOTE, UPVOTE } from '../constants/votesTypes';

export function votesReducer(votes, action) {
  const currentVote = votes[action.payload.commentId]?.vote || 'none';

  switch (action.type) {
    case UPVOTE: {
      let newVote;
      let offset;
      if (currentVote === 'none') {
        newVote = 'upvote';
        offset = 1;
      } else if (currentVote === 'downvote') {
        newVote = 'upvote';
        offset = 1;
      } else if (currentVote === 'upvote') {
        newVote = 'none';
        offset = 0;
      }

      return {
        ...votes,
        [action.payload.commentId]: { vote: newVote, offset },
      };
    }

    case DOWNVOTE: {
      let newVote;
      let offset;
      if (currentVote === 'none') {
        newVote = 'downvote';
        offset = -1;
      } else if (currentVote === 'upvote') {
        newVote = 'downvote';
        offset = -1;
      } else if (currentVote === 'downvote') {
        newVote = 'none';
        offset = 0;
      }

      return {
        ...votes,
        [action.payload.commentId]: { vote: newVote, offset },
      };
    }

    default:
      return votes;
  }
}
