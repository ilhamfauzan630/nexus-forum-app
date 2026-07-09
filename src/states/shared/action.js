import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function upVoteThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function downVoteThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralVoteThreadActionCreator({ userId, threadId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function upVoteCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function downVoteCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function neutralVoteCommentActionCreator({ userId, commentId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(upVoteThreadActionCreator({
      userId: authUser.id,
      threadId,
    }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(neutralVoteThreadActionCreator({
        userId: authUser.id,
        threadId,
      }));

      alert(error.message);
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(downVoteThreadActionCreator({
      userId: authUser.id,
      threadId,
    }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(neutralVoteThreadActionCreator({
        userId: authUser.id,
        threadId,
      }));

      alert(error.message);
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(neutralVoteThreadActionCreator({
      userId: authUser.id,
      threadId,
    }));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(upVoteCommentActionCreator({
      userId: authUser.id,
      commentId,
    }));

    try {
      await api.upVoteComment({ threadId, commentId });

    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(downVoteCommentActionCreator({
      userId: authUser.id,
      commentId,
    }));

    try {
      await api.downVoteComment({ threadId, commentId });

    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncNeutralVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    dispatch(neutralVoteCommentActionCreator({
      userId: authUser.id,
      commentId,
    }));

    try {
      await api.neutralVoteComment({ threadId, commentId });

    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  asyncPopulateUsersAndThreads,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};