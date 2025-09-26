import { DOWNVOTE, UPVOTE } from '../constants/votesTypes';

export function votesReducer(votes, action) {
  switch (action.type) {
    case UPVOTE: {
      const currentVote = votes[action.payload.id]?.vote || 'none';
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
        [action.payload.id]: { vote: newVote, offset },
      };
    }

    case DOWNVOTE: {
      const currentVote = votes[action.payload.id]?.vote || 'none';
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
        [action.payload.id]: { vote: newVote, offset },
      };
    }

    default:
      return votes;
  }
}
