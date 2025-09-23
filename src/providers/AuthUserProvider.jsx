import { useEffect, useReducer } from 'react';
import { AuthUserContext } from '../contexts/AuthUserContext';
import { authUserReducer } from '../reducers/authUserReducer';

export default function AuthUserProvider({ children }) {
  const [authUser, dispatchAuth] = useReducer(authUserReducer, {}, () => {
    const localData = localStorage.getItem('authUser');
    return localData ? JSON.parse(localData) : {};
  });

  useEffect(() => {
    localStorage.setItem('authUser', JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthUserContext value={{ authUser, dispatchAuth }}>
      {children}
    </AuthUserContext>
  );
}
