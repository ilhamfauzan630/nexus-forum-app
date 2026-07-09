import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaRegComment,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
}) {
  const navigate = useNavigate();

  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();

    if (isThreadUpVoted) {
      neutralVoteThread(id);
    } else {
      upVoteThread(id);
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();

    if (isThreadDownVoted) {
      neutralVoteThread(id);
    } else {
      downVoteThread(id);
    }
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      className="thread-item"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <div className="thread-item__user-photo">
        {user.avatar && <img src={user.avatar} alt={user.name} />}
      </div>

      <div className="thread-item__detail">
        <header className="thread-item__header">
          <div className="thread-item__user-info">
            <p className="thread-item__user-name">{user.name}</p>
            <p className="thread-item__user-id">
              @
              {user.id}
            </p>
          </div>

          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </header>

        <div className="thread-item__content">
          <p className="thread-item__category">
            #
            {category}
          </p>

          <h3 className="thread-item__title">{title}</h3>

          <div
            className="thread-item__body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>

        <div className="thread-item__footer">
          <p className="thread-item__action">
            <button
              type="button"
              className={isThreadUpVoted ? 'thread-item__action-button thread-item__action-button--active' : 'thread-item__action-button'}
              aria-label="up vote"
              onClick={onUpVoteClick}
            >
              {isThreadUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </button>
            <span>{upVotesBy.length}</span>
          </p>

          <p className="thread-item__action">
            <button
              type="button"
              className={isThreadDownVoted ? 'thread-item__action-button thread-item__action-button--active' : 'thread-item__action-button'}
              aria-label="down vote"
              onClick={onDownVoteClick}
            >
              {isThreadDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            </button>
            <span>{downVotesBy.length}</span>
          </p>

          <p className="thread-item__action thread-item__action--comment">
            <FaRegComment />
            {' '}
            {totalComments}
          </p>
        </div>
      </div>
    </article>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.string,
  upVoteThread: PropTypes.func,
  downVoteThread: PropTypes.func,
  neutralVoteThread: PropTypes.func,
};

ThreadItem.defaultProps = {
  authUser: '',
  upVoteThread: null,
  downVoteThread: null,
  neutralVoteThread: null,
  upVotesBy: [],
  downVotesBy: [],
};

export { threadItemShape };

export default ThreadItem;
