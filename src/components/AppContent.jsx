import { useCommentInteraction } from '../hooks/useCommentInteraction';
import { useInitData } from '../hooks/useInitData';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import DeleteModal from './DeleteModal';

export default function AppContent() {
  const { commentInteraction } = useCommentInteraction();
  useInitData();

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4 font-rubik text-Grey-500 sm:p-[5%] md:p-[7.5%] lg:my-8 lg:p-0">
      <CommentList />
      <CommentInput />
      {commentInteraction.activeDeleteId && (
        <DeleteModal ids={commentInteraction.activeDeleteId} />
      )}
    </div>
  );
}
