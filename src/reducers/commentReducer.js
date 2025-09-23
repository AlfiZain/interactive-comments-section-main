import {
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  EDIT_COMMENT,
  EDIT_REPLY,
  RECEIVE_COMMENTS,
} from '../constants/commentTypes';

export function commentReducer(comments, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS: {
      return action.payload.comments;
    }

    case ADD_COMMENT: {
      return [...comments, action.payload.comment];
    }

    case EDIT_COMMENT: {
      return comments.map((comment) => {
        if (comment.id === action.payload.id) {
          return { ...comment, content: action.payload.content };
        }
        return comment;
      });
    }

    case DELETE_COMMENT: {
      return comments.filter((comment) => comment.id !== action.payload.id);
    }

    case ADD_REPLY: {
      return comments.map((comment) => {
        if (comment.id === action.payload.parentId) {
          return {
            ...comment,
            replies: [...comment.replies, action.payload.reply],
          };
        }
        return comment;
      });
    }

    case EDIT_REPLY: {
      return comments.map((comment) => {
        if (!comment.replies) return comment;
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === action.payload.id) {
              return { ...reply, content: action.payload.content };
            }
            return reply;
          }),
        };
      });
    }

    case DELETE_REPLY: {
      return comments.map((comment) => {
        if (comment.id !== action.payload.commentId) return comment;

        return {
          ...comment,
          replies: comment.replies.filter(
            (reply) => reply.id !== action.payload.replyId,
          ),
        };
      });
    }

    default:
      return comments;
  }
}
