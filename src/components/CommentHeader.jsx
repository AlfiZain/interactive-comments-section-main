import { useAuthUser } from '../hooks/useAuthUser';
import { formatRelativeTime } from '../utils/formatRelativeTime';

export default function CommentHeader({ user, createdAt }) {
  const { authUser } = useAuthUser();

  return (
    <div className="flex flex-row items-center gap-x-4 lg:max-w-3/4">
      <img
        src={user?.image.webp}
        alt={`${user?.username} photo`}
        className="max-w-8"
      />
      <div>
        <span className="mr-2 font-bold text-Grey-800">{user?.username}</span>
        {user?.username === authUser.username ? (
          <span className="rounded-sm bg-Purple-600 px-2 py-1 text-White">
            you
          </span>
        ) : (
          ''
        )}
      </div>
      <span>{formatRelativeTime(createdAt)}</span>
    </div>
  );
}
