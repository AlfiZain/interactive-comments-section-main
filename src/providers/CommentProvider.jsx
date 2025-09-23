import { useEffect, useReducer } from 'react';
import { commentReducer } from '../reducers/commentReducer';
import { CommentContext } from '../contexts/CommentContext';

export default function CommentProvider({ children }) {
  const [comments, dispatchComment] = useReducer(commentReducer, [], () => {
    const localData = localStorage.getItem('comments');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <CommentContext value={{ comments, dispatchComment }}>
      {children}
    </CommentContext>
  );
}
