import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CategoryFilter from '../components/CategoryFilter';
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
  const [selectedCategory, setSelectedCategory] = useState('');

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

  function onSelectCategory(category) {
    setSelectedCategory((currentCategory) => (
      currentCategory === category ? '' : category
    ));
  }

  const categories = useMemo(() => {
    const categoryCounter = new Map();

    threads.forEach((thread) => {
      const category = thread.category || '';
      if (!category.trim()) {
        return;
      }

      categoryCounter.set(category, (categoryCounter.get(category) || 0) + 1);
    });

    return Array.from(categoryCounter, ([name, count]) => ({
      name,
      count,
    })).sort((firstCategory, secondCategory) => (
      secondCategory.count - firstCategory.count
      || firstCategory.name.localeCompare(secondCategory.name)
    ));
  }, [threads]);

  const visibleThreads = useMemo(() => (
    selectedCategory
      ? threads.filter((thread) => thread.category === selectedCategory)
      : threads
  ), [selectedCategory, threads]);

  const threadList = visibleThreads.map((thread) => ({
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
      <header className="home-page__header">
        <p className="page-eyebrow">Community feed</p>
        <h1>Home</h1>
      </header>

      <ThreadInput addThread={onAddThread} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

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
