import ReplyItem from './ReplyItem';

export default function ReplyList({ replies, parentId }) {
  if (!replies?.length) {
    return null;
  }

  return (
    <div className="mt-4 ml-4 space-y-4 border-l-2 border-Grey-100 pl-4">
      {replies.map((reply, index) => (
        <ReplyItem key={index} {...reply} parentId={parentId}></ReplyItem>
      ))}
    </div>
  );
}
