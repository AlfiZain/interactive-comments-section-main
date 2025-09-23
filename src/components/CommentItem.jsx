import BaseCommentItem from './BaseCommentItem';
import ReplyList from './ReplyList';

export default function CommentItem(props) {
  return (
    <BaseCommentItem {...props} width="w-full">
      <ReplyList replies={props.replies} parentId={props.id} />
    </BaseCommentItem>
  );
}
