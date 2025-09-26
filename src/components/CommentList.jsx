import { useComment } from '../hooks/useComment';
import CommentItem from './CommentItem';

export default function CommentList() {
  const { comments } = useComment();

  return (
    <section className="space-y-4">
      {comments?.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </section>
  );
}
