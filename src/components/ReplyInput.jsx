import { useState } from 'react';
import { useComment } from '../hooks/useComment';
import { addReply } from '../actions/commentAction';
import { closeAll } from '../actions/commentInteractionAction';
import { useCommentInteraction } from '../hooks/useCommentInteraction';

export default function ReplyInput({
  id,
  parentId = null,
  currentUser,
  owner,
}) {
  const [replyContent, setReplyContent] = useState('');
  const { dispatchComment } = useComment();
  const { dispatchCommentInteraction } = useCommentInteraction();

  const handleReplyChange = (event) => {
    let newValue = event.target.value;
    if (owner) {
      const mention = `@${owner} `;
      setReplyContent(newValue.slice(mention.length));
    } else {
      setReplyContent(newValue);
    }
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      return;
    }
    if (parentId) {
      dispatchComment(addReply(parentId, replyContent, currentUser, owner));
    } else {
      dispatchComment(addReply(id, replyContent, currentUser, owner));
    }
    dispatchCommentInteraction(closeAll());
  };

  return (
    <div className="mt-4 flex flex-wrap items-start justify-end gap-4 bg-White p-4">
      <img
        src={currentUser?.image.webp}
        alt={currentUser?.username}
        className="max-h-8 max-w-8"
      />
      <textarea
        value={owner ? `@${owner} ${replyContent}` : replyContent}
        onChange={handleReplyChange}
        placeholder="Write your reply..."
        className="min-h-24 grow cursor-pointer resize-none rounded-md px-4 py-2 ring-1 ring-Grey-100 outline-none placeholder:text-Grey-500 hover:ring-2 hover:ring-Grey-500 focus:ring-2 focus:ring-Grey-500"
      />
      <button
        onClick={handleSubmitReply}
        className="cursor-pointer self-end rounded-md bg-Purple-600 px-4 py-2 text-White transition duration-300 hover:brightness-200 lg:self-start"
      >
        REPLY
      </button>
    </div>
  );
}
