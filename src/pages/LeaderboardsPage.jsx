import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LeaderboardsList from '../components/LeaderboardsList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();

  const leaderboards = useSelector(
    (states) => states.leaderboards || [],
  );

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <header className="leaderboards-page__header">
        <p className="page-eyebrow">Top contributors</p>
        <h1>Leaderboards</h1>
      </header>

      <LeaderboardsList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderboardsPage;
