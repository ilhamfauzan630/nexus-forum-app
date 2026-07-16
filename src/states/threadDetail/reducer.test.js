/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *   - should return the initial state when given unknown action
 *   - should return thread detail when given RECEIVE_THREAD_DETAIL action
 *   - should return null when given CLEAR_THREAD_DETAIL action
 *   - should return thread detail with new comment when given ADD_COMMENT action
 *   - should return thread detail with empty comments when given CLEAR_COMMENTS action
 *   - should return thread detail with up-voted thread when given UP_VOTE_THREAD action
 *   - should return thread detail with down-voted thread when given DOWN_VOTE_THREAD action
 *   - should return thread detail with neutral-voted thread when given NEUTRAL_VOTE_THREAD action
 *   - should return thread detail with up-voted comment when given UP_VOTE_COMMENT action
 *   - should return thread detail with down-voted comment when given DOWN_VOTE_COMMENT action
 *   - should return thread detail with neutral-voted comment when given NEUTRAL_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType as ThreadDetailActionType } from './action';
import { ActionType as SharedActionType } from '../shared/action';

const initialThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2026-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'ilham fauzan',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2026-06-21T07:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Jane Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ThreadDetailActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        thread: initialThreadDetail,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = initialThreadDetail;
    const action = {
      type: ThreadDetailActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return thread detail with new comment when given ADD_COMMENT action', () => {
    // arrange
    const initialState = initialThreadDetail;
    const newComment = {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
      createdAt: '2026-06-22T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'ilham fauzan',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ThreadDetailActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        ...initialState.comments,
        newComment,
      ],
    });
  });

  it('should return thread detail with empty comments when given CLEAR_COMMENTS action', () => {
    // arrange
    const initialState = initialThreadDetail;
    const action = {
      type: ThreadDetailActionType.CLEAR_COMMENTS,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [],
    });
  });

  it('should return thread detail with up-voted thread when given UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
      ...initialThreadDetail,
      upVotesBy: [],
      downVotesBy: ['users-1'],
    };

    const action = {
      type: SharedActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['users-1'],
      downVotesBy: [],
    });
  });

  it('should return thread detail with down-voted thread when given DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
      ...initialThreadDetail,
      upVotesBy: ['users-1'],
      downVotesBy: [],
    };

    const action = {
      type: SharedActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['users-1'],
    });
  });

  it('should return thread detail with neutral-voted thread when given NEUTRAL_VOTE_THREAD action', () => {
    // arrange
    const initialState = {
      ...initialThreadDetail,
      upVotesBy: ['users-1'],
      downVotesBy: [],
    };

    const action = {
      type: SharedActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return thread detail with up-voted comment when given UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      ...initialThreadDetail,
      comments: [
        {
          ...initialThreadDetail.comments[0],
          upVotesBy: [],
          downVotesBy: ['users-1'],
        },
      ],
    };

    const action = {
      type: SharedActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    });
  });

  it('should return thread detail with down-voted comment when given DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      ...initialThreadDetail,
      comments: [
        {
          ...initialThreadDetail.comments[0],
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: SharedActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: ['users-1'],
        },
      ],
    });
  });

  it('should return thread detail with neutral-voted comment when given NEUTRAL_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      ...initialThreadDetail,
      comments: [
        {
          ...initialThreadDetail.comments[0],
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: SharedActionType.NEUTRAL_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    });
  });
});