import replyIcon from '../assets/images/icon-reply.svg';
import editIcon from '../assets/images/icon-edit.svg';
import deleteIcon from '../assets/images/icon-delete.svg';
import { useAuthUser } from '../hooks/useAuthUser';
import { useCommentInteraction } from '../hooks/useCommentInteraction';
import {
  openDelete,
  openEdit,
  openReply,
} from '../actions/commentInteractionAction';

export default function CommentActions({
  id,
  parentId = null,
  user,
  className,
}) {
  const { authUser } = useAuthUser();
  const { commentInteraction, dispatchCommentInteraction } =
    useCommentInteraction();

  const handleDeleteClick = () => {
    if (!parentId) {
      dispatchCommentInteraction(openDelete({ commentId: id }));
    } else {
      dispatchCommentInteraction(
        openDelete({ commentId: parentId, replyId: id }),
      );
    }
  };

  return (
    <div
      className={`flex w-fit items-center gap-x-4 lg:items-start ${className}`}
    >
      {user?.username === authUser.username ? (
        <>
          <button
            onClick={handleDeleteClick}
            aria-label="delete comment"
            disabled={commentInteraction.activeDeleteId === id ? true : false}
            className={`flex items-center gap-x-2 text-Pink-400 hover:brightness-200 ${commentInteraction.activeDeleteId === id ? 'cursor-not-allowed brightness-200' : 'cursor-pointer brightness-100'}`}
          >
            <img src={deleteIcon} alt="delete icon" />
            Delete
          </button>
          <button
            onClick={() => dispatchCommentInteraction(openEdit(id))}
            aria-label="edit comment"
            disabled={commentInteraction.activeEditId === id ? true : false}
            className={`flex items-center gap-x-2 text-Purple-600 hover:brightness-200 ${commentInteraction.activeEditId === id ? 'cursor-not-allowed brightness-200' : 'cursor-pointer brightness-100'}`}
          >
            <img src={editIcon} alt="edit icon" />
            Edit
          </button>
        </>
      ) : (
        <button
          onClick={() => dispatchCommentInteraction(openReply(id))}
          aria-label="reply comment"
          disabled={commentInteraction.activeReplyId === id ? true : false}
          className={`flex items-center gap-x-2 text-Purple-600 hover:brightness-200 ${commentInteraction.activeReplyId === id ? 'cursor-not-allowed brightness-200' : 'cursor-pointer brightness-100'}`}
        >
          <img src={replyIcon} alt="reply icon" />
          Reply
        </button>
      )}
    </div>
  );
}
