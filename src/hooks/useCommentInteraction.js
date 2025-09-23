import { useContext } from 'react';
import { CommentInteractionContext } from '../contexts/CommentInteractionContext';

export function useCommentInteraction() {
  return useContext(CommentInteractionContext);
}
