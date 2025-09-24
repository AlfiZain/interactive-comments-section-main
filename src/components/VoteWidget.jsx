import iconPlus from '../../src/assets/images/icon-plus.svg';
import iconMinus from '../../src/assets/images/icon-minus.svg';
import { useVotes } from '../hooks/useVotes';
import { downvoteComment, upvoteComment } from '../actions/votesAction';

export default function VoteWidget({ id, score, className }) {
  const { votes, dispatchVotes } = useVotes();
  const offset = votes[id]?.offset ?? 0;

  return (
    <div
      className={`flex flex-row items-center gap-2 rounded-md bg-Grey-50 lg:flex-col ${className}`}
    >
      <button
        onClick={() => dispatchVotes(upvoteComment(id))}
        className={`cursor-pointer p-2 transition duration-300 hover:brightness-50 sm:p-4 ${votes[id]?.vote === 'upvote' ? 'brightness-50' : 'brightness-100'}`}
      >
        <img src={iconPlus} alt="upvote" className="h-auto max-w-4" />
      </button>
      <span className="font-bold text-Purple-600">
        {Number(score) + offset}
      </span>
      <button
        onClick={() => dispatchVotes(downvoteComment(id))}
        className={`cursor-pointer p-2 transition duration-300 hover:brightness-50 sm:p-4 ${votes[id]?.vote === 'downvote' ? 'brightness-50' : 'brightness-100'}`}
      >
        <img src={iconMinus} alt="downvote" className="h-auto max-w-4" />
      </button>
    </div>
  );
}
