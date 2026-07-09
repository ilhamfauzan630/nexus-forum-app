import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ThreadInput from '../components/ThreadInput';
import ThreadsList from '../components/ThreadsList';

import {
  asyncAddThread,
} from '../states/threads/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread
} from '../states/shared/action';

function HomePage() {
  const dispatch = useDispatch();

  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => ({
    threads: states.threads,
    users: states.users,
    authUser: states.authUser,
  }));

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  function onAddThread({ title, body, category }) {
    dispatch(asyncAddThread({ title, body, category }));
  }

  function onUpVoteThread(threadId) {
    dispatch(asyncUpVoteThread(threadId));
  }

  function onDownVoteThread(threadId) {
    dispatch(asyncDownVoteThread(threadId));
  }

  function onNeutralVoteThread(threadId) {
    dispatch(asyncNeutralVoteThread(threadId));
  }

  const threadList = threads.map((thread) => ({
    ...thread,
    upVotesBy: thread.upVotesBy,
    downVotesBy: thread.downVotesBy,
    totalComments: thread.totalComments || 0,
    user: users.find((user) => user.id === thread.ownerId) || {
      id: thread.ownerId,
      name: 'Unknown User',
      avatar: null,
    },
  }));

  return (
    <section className="home-page">
      <ThreadInput addThread={onAddThread} />

      <ThreadsList
        threads={threadList}
        authUser={authUser ? authUser.id : ''}
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neutralVote={onNeutralVoteThread}
      />
    </section>
  );
}

export default HomePage;