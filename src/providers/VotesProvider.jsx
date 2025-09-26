import { useEffect, useReducer } from 'react';
import { votesReducer } from '../reducers/votesReducer';
import { VotesContext } from '../contexts/VotesContext';

export default function VotesProvider({ initialVotes = {}, children }) {
  const [votes, dispatchVotes] = useReducer(
    votesReducer,
    initialVotes,
    (initialArg) => {
      const localData = localStorage.getItem('votes');
      return localData ? JSON.parse(localData) : initialArg;
    },
  );

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  return (
    <VotesContext value={{ votes, dispatchVotes }}>{children}</VotesContext>
  );
}
