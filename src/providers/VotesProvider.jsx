import { useEffect, useReducer } from 'react';
import { votesReducer } from '../reducers/votesReducer';
import { VotesContext } from '../contexts/VotesContext';

export default function VotesProvider({ children }) {
  const [votes, dispatchVotes] = useReducer(votesReducer, {}, () => {
    const localData = localStorage.getItem('votes');
    return localData ? JSON.parse(localData) : {};
  });

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  return (
    <VotesContext value={{ votes, dispatchVotes }}>{children}</VotesContext>
  );
}
