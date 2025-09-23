import { useReducer } from 'react';
import { commentInteractionReducer } from '../reducers/commentInteractionReducer';
import { CommentInteractionContext } from '../contexts/CommentInteractionContext';

export default function CommentInteractionProvider({ children }) {
  const [commentInteraction, dispatchCommentInteraction] = useReducer(
    commentInteractionReducer,
    {},
  );
  return (
    <CommentInteractionContext
      value={{ commentInteraction, dispatchCommentInteraction }}
    >
      {children}
    </CommentInteractionContext>
  );
}
