import {
  ADD_COMMENT,
  ADD_REPLY,
  DELETE_COMMENT,
  DELETE_REPLY,
  EDIT_COMMENT,
  EDIT_REPLY,
  RECEIVE_COMMENTS,
} from '../constants/commentTypes';

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    payload: { comments },
  };
}

export function addComment(content, user) {
  const id = `comments-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  return {
    type: ADD_COMMENT,
    payload: {
      comment: {
        id,
        content,
        createdAt,
        score: 0,
        user,
        replies: [],
      },
    },
  };
}

export function editComment({ id, content }) {
  return {
    type: EDIT_COMMENT,
    payload: { id, content },
  };
}

export function deleteComment(id) {
  console.log('deleteComment');
  return {
    type: DELETE_COMMENT,
    payload: { id },
  };
}

export function addReply(parentId, content, user, replyingTo) {
  const id = `replies-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  return {
    type: ADD_REPLY,
    payload: {
      parentId,
      reply: {
        id,
        content,
        createdAt,
        score: 0,
        replyingTo,
        user,
      },
    },
  };
}

export function editReply({ id, content }) {
  return {
    type: EDIT_REPLY,
    payload: { id, content },
  };
}

export function deleteReply({ commentId, replyId }) {
  console.log('deleteReply');
  return {
    type: DELETE_REPLY,
    payload: {
      commentId,
      replyId,
    },
  };
}
