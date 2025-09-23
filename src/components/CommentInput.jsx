import { useState } from 'react';
import { useAuthUser } from '../hooks/useAuthUser';
import { useComment } from '../hooks/useComment';
import { addComment } from '../actions/commentAction';

export default function CommentInput() {
  const [content, setContent] = useState('');
  const { authUser } = useAuthUser();
  const { dispatchComment } = useComment();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmitComment = () => {
    if (!content.trim()) return;
    dispatchComment(addComment(content, authUser));
    setContent('');
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-White p-4 lg:flex-nowrap lg:items-start">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Add a comment..."
        className="min-h-24 w-full cursor-pointer resize-none rounded-md px-4 py-2 ring-1 ring-Grey-100 outline-none placeholder:text-Grey-500 hover:ring-2 hover:ring-Grey-500 focus:ring-2 focus:ring-Grey-500 lg:order-2"
      />
      <img
        src={authUser?.image?.webp}
        alt={authUser?.username}
        className="max-h-8 max-w-8 lg:order-1"
      />
      <button
        onClick={handleSubmitComment}
        className="cursor-pointer self-end rounded-md bg-Purple-600 px-4 py-2 text-White transition duration-300 hover:brightness-200 lg:order-3 lg:self-start"
      >
        SEND
      </button>
    </section>
  );
}
