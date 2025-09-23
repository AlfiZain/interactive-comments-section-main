import { useState } from 'react';
import { useComment } from '../hooks/useComment';
import { editComment, editReply } from '../actions/commentAction';
import { useCommentInteraction } from '../hooks/useCommentInteraction';
import { closeAll } from '../actions/commentInteractionAction';

export default function CommentEditInput({ id, content, replyingTo = '' }) {
  const [editContent, setEditContent] = useState(content);
  const { dispatchComment } = useComment();
  const { dispatchCommentInteraction } = useCommentInteraction();

  const handleEditChange = (event) => {
    let newValue = event.target.value;

    if (replyingTo) {
      const mention = `@${replyingTo} `;
      setEditContent(newValue.slice(mention.length));
    } else {
      setEditContent(newValue);
    }
  };

  const handleUpdate = () => {
    if (replyingTo) {
      dispatchComment(editReply({ id, content: editContent }));
    } else {
      dispatchComment(editComment({ id, content: editContent }));
    }
    dispatchCommentInteraction(closeAll());
  };

  return (
    <div className="flex flex-col gap-y-4">
      <textarea
        className="min-h-32 w-full cursor-pointer resize-none rounded-md px-4 py-2 ring-1 ring-Grey-100 outline-none hover:ring-2 hover:ring-Grey-500 focus:ring-2 focus:ring-Grey-500"
        value={replyingTo ? `@${replyingTo} ${editContent}` : editContent}
        onChange={handleEditChange}
      />
      <button
        onClick={handleUpdate}
        className="cursor-pointer self-end rounded-md bg-Purple-600 px-4 py-2 text-White transition duration-300 hover:brightness-200"
      >
        UPDATE
      </button>
    </div>
  );
}
