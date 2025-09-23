import AuthUserProvider from './AuthUserProvider';
import CommentInteractionProvider from './CommentInteractionProvider';
import CommentProvider from './CommentProvider';
import VotesProvider from './VotesProvider';

export default function AppProvider({ children }) {
  return (
    <AuthUserProvider>
      <CommentProvider>
        <CommentInteractionProvider>
          <VotesProvider>{children}</VotesProvider>
        </CommentInteractionProvider>
      </CommentProvider>
    </AuthUserProvider>
  );
}
