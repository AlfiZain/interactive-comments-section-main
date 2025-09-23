import { useContext } from 'react';
import { AuthUserContext } from '../contexts/AuthUserContext';

export function useAuthUser() {
  return useContext(AuthUserContext);
}
