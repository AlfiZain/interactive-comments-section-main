import {
  CLOSE_ALL,
  OPEN_DELETE,
  OPEN_EDIT,
  OPEN_REPLY,
} from '../constants/commentInteractionTypes';

export function commentInteractionReducer(commentInteraction, action) {
  switch (action.type) {
    case OPEN_REPLY: {
      return {
        activeReplyId: action.payload.id,
        activeEditId: null,
        activeDeleteId: null,
      };
    }

    case OPEN_EDIT: {
      return {
        activeEditId: action.payload.id,
        activeReplyId: null,
        activeDeleteId: null,
      };
    }

    case OPEN_DELETE: {
      return {
        activeDeleteId: action.payload,
        activeReplyId: null,
        activeEditId: null,
      };
    }

    case CLOSE_ALL: {
      return {
        activeReplyId: null,
        activeEditId: null,
        activeDeleteId: null,
      };
    }

    default:
      return commentInteraction;
  }
}
