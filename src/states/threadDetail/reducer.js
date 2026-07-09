import { ActionType as ThreadDetailActionType } from './action';
import { ActionType as SharedActionType } from '../shared/action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ThreadDetailActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.thread;

  case ThreadDetailActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ThreadDetailActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [...threadDetail.comments, action.payload.comment],
    };

  case ThreadDetailActionType.RECEIVE_USERS:
    return {
      ...threadDetail,
      users: action.payload.users,
    };

  case ThreadDetailActionType.CLEAR_COMMENTS:
    return {
      ...threadDetail,
      comments: [],
    };

  case SharedActionType.UP_VOTE_THREAD:
    if (!threadDetail || threadDetail.id !== action.payload.threadId) {
      return threadDetail;
    }

    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
        ? threadDetail.upVotesBy
        : [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: threadDetail.downVotesBy.filter(
        (userId) => userId !== action.payload.userId,
      ),
    };

  case SharedActionType.DOWN_VOTE_THREAD:
    if (!threadDetail || threadDetail.id !== action.payload.threadId) {
      return threadDetail;
    }

    return {
      ...threadDetail,
      downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
        ? threadDetail.downVotesBy
        : [...threadDetail.downVotesBy, action.payload.userId],
      upVotesBy: threadDetail.upVotesBy.filter(
        (userId) => userId !== action.payload.userId,
      ),
    };

  case SharedActionType.NEUTRAL_VOTE_THREAD:
    if (!threadDetail || threadDetail.id !== action.payload.threadId) {
      return threadDetail;
    }

    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter(
        (userId) => userId !== action.payload.userId,
      ),
      downVotesBy: threadDetail.downVotesBy.filter(
        (userId) => userId !== action.payload.userId,
      ),
    };

  case SharedActionType.UP_VOTE_COMMENT:
    if (!threadDetail) return threadDetail;

    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }

        const upVotesBy = comment.upVotesBy || [];
        const downVotesBy = comment.downVotesBy || [];

        return {
          ...comment,
          upVotesBy: upVotesBy.includes(action.payload.userId)
            ? upVotesBy
            : [...upVotesBy, action.payload.userId],
          downVotesBy: downVotesBy.filter(
            (userId) => userId !== action.payload.userId,
          ),
        };
      }),
    };

  case SharedActionType.DOWN_VOTE_COMMENT:
    if (!threadDetail) return threadDetail;

    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }

        const upVotesBy = comment.upVotesBy || [];
        const downVotesBy = comment.downVotesBy || [];

        return {
          ...comment,
          downVotesBy: downVotesBy.includes(action.payload.userId)
            ? downVotesBy
            : [...downVotesBy, action.payload.userId],
          upVotesBy: upVotesBy.filter(
            (userId) => userId !== action.payload.userId,
          ),
        };
      }),
    };

  case SharedActionType.NEUTRAL_VOTE_COMMENT:
    if (!threadDetail) return threadDetail;

    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }

        return {
          ...comment,
          upVotesBy: (comment.upVotesBy || []).filter(
            (userId) => userId !== action.payload.userId,
          ),
          downVotesBy: (comment.downVotesBy || []).filter(
            (userId) => userId !== action.payload.userId,
          ),
        };
      }),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;