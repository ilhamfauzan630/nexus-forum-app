import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({
  threads,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          upVoteThread={upVote}
          downVoteThread={downVote}
          neutralVoteThread={neutralVote}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape(threadItemShape),
  ).isRequired,
  authUser: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

ThreadsList.defaultProps = {
  authUser: '',
  upVote: null,
  downVote: null,
  neutralVote: null,
};

export default ThreadsList;