import CommentActions from './CommentActions';
import CommentHeader from './CommentHeader';
import VoteWidget from './VoteWidget';
import ReplyInput from './ReplyInput';
import { useAuthUser } from '../hooks/useAuthUser';
import CommentEditInput from './CommentEditInput';
import { useCommentInteraction } from '../hooks/useCommentInteraction';

export default function BaseCommentItem({
  id,
  parentId = null,
  content,
  createdAt,
  score,
  user,
  replyingTo = '',
  width = 'w-64',
  children,
}) {
  const { authUser } = useAuthUser();
  const { commentInteraction } = useCommentInteraction();

  return (
    <div className={`overflow-hidden ${width}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-White p-4 lg:relative lg:flex-nowrap lg:items-start lg:gap-4">
        <div className="order-1 mb-4 flex w-full flex-col gap-y-4 lg:order-2">
          <CommentHeader user={user} createdAt={createdAt} />
          {commentInteraction.activeEditId === id ? (
            <CommentEditInput
              id={id}
              content={content}
              replyingTo={replyingTo}
            />
          ) : (
            <p>
              <span className="font-bold text-Purple-600">
                {replyingTo ? `@${replyingTo} ` : null}
              </span>
              {content}
            </p>
          )}
        </div>
        <VoteWidget id={id} score={score} className="order-2 lg:order-1" />
        <CommentActions
          id={id}
          parentId={parentId}
          user={user}
          className="order-3 lg:absolute lg:top-5 lg:right-4"
        />
      </div>

      {commentInteraction.activeReplyId === id && (
        <ReplyInput
          id={id}
          parentId={parentId}
          currentUser={authUser}
          owner={user.username}
        />
      )}
      {children}
    </div>
  );
}
