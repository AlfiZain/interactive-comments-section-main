import { useEffect, useReducer } from 'react';
import { commentReducer } from '../reducers/commentReducer';
import { CommentContext } from '../contexts/CommentContext';

export default function CommentProvider({ initialComment = [], children }) {
  const [comments, dispatchComment] = useReducer(
    commentReducer,
    initialComment,
    (initialArg) => {
      const localData = localStorage.getItem('comments');
      return localData ? JSON.parse(localData) : initialArg;
    },
  );

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  return (
    <CommentContext value={{ comments, dispatchComment }}>
      {children}
    </CommentContext>
  );
}
