/**
 * test scenario for leaderboards actions
 *
 * - asyncReceiveLeaderboards thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from './action';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';

describe('asyncReceiveLeaderboards thunk', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const fakeLeaderboardsResponse = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
        },
        score: 100,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
        score: 80,
      },
    ];

    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());

    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );

    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const fakeErrorResponse = new Error('Something went wrong');

    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());

    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    expect(window.alert).toHaveBeenCalledWith(
      fakeErrorResponse.message,
    );
  });
});