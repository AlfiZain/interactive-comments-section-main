import { useContext } from 'react';
import { VotesContext } from '../contexts/VotesContext';

export function useVotes() {
  return useContext(VotesContext);
}
