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
      <h2>Leaderboards</h2>

      <LeaderboardsList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderboardsPage;