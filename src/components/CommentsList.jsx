import React from 'react';
import PropTypes from 'prop-types';

import CommentItem, { commentItemShape } from './CommentItem';

function CommentsList({
  comments,
  authUser,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
}) {
  return (
    <div className="comment-list">
      <h3>
        Komentar (
        {comments.length}
        )
      </h3>

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
          neutralVoteComment={neutralVoteComment}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape(commentItemShape),
  ).isRequired,
  authUser: PropTypes.string,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  neutralVoteComment: PropTypes.func,
};

CommentsList.defaultProps = {
  authUser: '',
  upVoteComment: null,
  downVoteComment: null,
  neutralVoteComment: null,
};

export default CommentsList;