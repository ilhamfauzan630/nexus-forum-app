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
    <article className="comment-item">
      <img className="comment-item__avatar" src={owner.avatar} alt={owner.name} />

      <div className="comment-item__content">
        <header className="comment-item__header">
          <p className="comment-item__name">{owner.name}</p>
          <small className="comment-item__created-at">{createdAt}</small>
        </header>

        <p className="comment-item__body">{content}</p>

        <div className="comment-item__vote">
          <button
            type="button"
            className={isCommentUpVoted ? 'comment-item__vote-button comment-item__vote-button--active' : 'comment-item__vote-button'}
            aria-label="up vote comment"
            onClick={onUpVoteClick}
          >
            {isCommentUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </button>
          <span>{upVotesBy.length}</span>

          <button
            type="button"
            className={isCommentDownVoted ? 'comment-item__vote-button comment-item__vote-button--active' : 'comment-item__vote-button'}
            aria-label="down vote comment"
            onClick={onDownVoteClick}
          >
            {isCommentDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
          </button>
          <span>{downVotesBy.length}</span>
        </div>
      </div>
    </article>
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
