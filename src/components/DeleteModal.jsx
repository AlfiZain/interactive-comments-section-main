import { deleteComment, deleteReply } from '../actions/commentAction';
import { closeAll } from '../actions/commentInteractionAction';
import { useComment } from '../hooks/useComment';
import { useCommentInteraction } from '../hooks/useCommentInteraction';

export default function DeleteModal({ ids }) {
  const { dispatchComment } = useComment();
  const { dispatchCommentInteraction } = useCommentInteraction();

  const handleDeleteClick = () => {
    console.log(ids);
    if (ids.replyId) {
      dispatchComment(
        deleteReply({ commentId: ids.commentId, replyId: ids.replyId }),
      );
    } else {
      dispatchComment(deleteComment(ids.commentId));
    }
    dispatchCommentInteraction(closeAll());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-Grey-800">
          Delete comment
        </h2>
        <p className="mb-6">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex items-center gap-4">
          <button
            className="w-full cursor-pointer rounded-md bg-Grey-500 px-4 py-3 text-White transition duration-300 hover:bg-Grey-500/50"
            onClick={() => dispatchCommentInteraction(closeAll())}
          >
            NO, CANCEL
          </button>
          <button
            className="w-full cursor-pointer rounded-md bg-Pink-400 px-4 py-3 text-White transition duration-300 hover:bg-Pink-200"
            onClick={handleDeleteClick}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
