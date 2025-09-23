import { useEffect } from 'react';
import data from '../data/data.json';
import { useAuthUser } from './useAuthUser';
import { useComment } from './useComment';
import { receiveAuthUser } from '../actions/authUserAction';
import { receiveComments } from '../actions/commentAction';

export function useInitData() {
  const { dispatchAuth } = useAuthUser();
  const { dispatchComment } = useComment();

  const { currentUser, comments } = data;

  useEffect(() => {
    if (!localStorage.getItem('authUser')) {
      dispatchAuth(receiveAuthUser(currentUser));
    }

    if (!localStorage.getItem('comments')) {
      dispatchComment(receiveComments(comments));
    }
  }, [dispatchAuth, dispatchComment, currentUser, comments]);
}
