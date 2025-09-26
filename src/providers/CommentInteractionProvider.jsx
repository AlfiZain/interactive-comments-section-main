import { useReducer } from 'react';
import { commentInteractionReducer } from '../reducers/commentInteractionReducer';
import { CommentInteractionContext } from '../contexts/CommentInteractionContext';

export default function CommentInteractionProvider({
  initialCommentInteraction = {},
  children,
}) {
  const [commentInteraction, dispatchCommentInteraction] = useReducer(
    commentInteractionReducer,
    initialCommentInteraction,
  );
  return (
    <CommentInteractionContext
      value={{ commentInteraction, dispatchCommentInteraction }}
    >
      {children}
    </CommentInteractionContext>
  );
}
