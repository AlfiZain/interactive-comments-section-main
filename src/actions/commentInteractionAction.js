import {
  CLOSE_ALL,
  OPEN_DELETE,
  OPEN_EDIT,
  OPEN_REPLY,
} from '../constants/commentInteractionTypes';

export function openReply(id) {
  return {
    type: OPEN_REPLY,
    payload: { id },
  };
}

export function openEdit(id) {
  return {
    type: OPEN_EDIT,
    payload: { id },
  };
}

export function openDelete({ commentId, replyId = null }) {
  return {
    type: OPEN_DELETE,
    payload: {
      commentId,
      replyId,
    },
  };
}

export function closeAll() {
  return {
    type: CLOSE_ALL,
  };
}
