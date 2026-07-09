import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({
  rank,
  user,
  score,
}) {
  return (
    <div className="leaderboard-item">
      <p className="leaderboard-item__rank">
        #
        {rank}
      </p>

      <img
        src={user.avatar}
        alt={user.name}
        className="leaderboard-item__avatar"
      />

      <div className="leaderboard-item__user">
        <p className="leaderboard-item__name">
          {user.name}
        </p>

        <p className="leaderboard-item__email">
          {user.email}
        </p>
      </div>

      <p className="leaderboard-item__score">
        {score}
      </p>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  ...leaderboardItemShape,
};

export { leaderboardItemShape };

export default LeaderboardItem;