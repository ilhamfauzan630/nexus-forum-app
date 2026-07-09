import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardItem, {
  leaderboardItemShape,
} from './LeaderboardItem';

function LeaderboardsList({ leaderboards }) {
  return (
    <div className="leaderboards-list">
      {leaderboards.map((leaderboard, index) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          rank={index + 1}
          {...leaderboard}
        />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape(leaderboardItemShape),
  ).isRequired,
};

export default LeaderboardsList;