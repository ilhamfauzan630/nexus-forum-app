import { ActionType as ThreadsActionType } from './action';
import { ActionType as SharedActionType } from '../shared/action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ThreadsActionType.RECEIVE_THREADS:
    return action.payload.threads || [];

  case ThreadsActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];

  case SharedActionType.UP_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }

      const upVotesBy = thread.upVotesBy || [];
      const downVotesBy = thread.downVotesBy || [];

      return {
        ...thread,
        upVotesBy: upVotesBy.includes(action.payload.userId)
          ? upVotesBy
          : [...upVotesBy, action.payload.userId],
        downVotesBy: downVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
      };
    });

  case SharedActionType.DOWN_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }

      const upVotesBy = thread.upVotesBy || [];
      const downVotesBy = thread.downVotesBy || [];

      return {
        ...thread,
        downVotesBy: downVotesBy.includes(action.payload.userId)
          ? downVotesBy
          : [...downVotesBy, action.payload.userId],
        upVotesBy: upVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
      };
    });

  case SharedActionType.NEUTRAL_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }

      const upVotesBy = thread.upVotesBy || [];
      const downVotesBy = thread.downVotesBy || [];

      return {
        ...thread,
        upVotesBy: upVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
        downVotesBy: downVotesBy.filter(
          (userId) => userId !== action.payload.userId,
        ),
      };
    });

  default:
    return threads;
  }
}

export default threadsReducer;