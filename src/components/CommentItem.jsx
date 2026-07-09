import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
}) {
  const isCommentUpVoted = upVotesBy.includes(authUser);
  const isCommentDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    if (isCommentUpVoted) {
      neutralVoteComment(id);
    } else {
      upVoteComment(id);
    }
  };

  const onDownVoteClick = () => {
    if (isCommentDownVoted) {
      neutralVoteComment(id);
    } else {
      downVoteComment(id);
    }
  };

  return (
    <div className="comment-item">
      <img src={owner.avatar} alt={owner.name} />

      <div>
        <p>{owner.name}</p>
        <p>{content}</p>
        <small>{createdAt}</small>

        <div className="comment-item__vote">
          <button type="button" aria-label="up vote comment" onClick={onUpVoteClick}>
            {isCommentUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </button>
          <span>{upVotesBy.length}</span>

          <button type="button" aria-label="down vote comment" onClick={onDownVoteClick}>
            {isCommentDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
          </button>
          <span>{downVotesBy.length}</span>
        </div>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
};

CommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.string,
  upVoteComment: PropTypes.func,
  downVoteComment: PropTypes.func,
  neutralVoteComment: PropTypes.func,
};

CommentItem.defaultProps = {
  authUser: '',
  upVotesBy: [],
  downVotesBy: [],
  upVoteComment: null,
  downVoteComment: null,
  neutralVoteComment: null,
};

export { commentItemShape };

export default CommentItem;