import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';
import { postedAt } from '../utils';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
}) {
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  return (
    <section className="thread-detail">
      <header>
        <img src={owner.avatar} alt={owner.name} />
        <div className="thread-detail__user-info">
          <p className="thread-detail__user-name">{owner.name}</p>
          <p className="thread-detail__user-id">
            @
            {owner.id}
          </p>
        </div>
      </header>

      <article>
        <p className="thread-detail__category">
          #
          {category}
        </p>
        <h2 className="thread-detail__title">{title}</h2>
        <div
          className="thread-detail__body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>

      <footer>
        <div className="thread-detail__vote">
          <button type="button" aria-label="up vote" onClick={() => (isThreadUpVoted? neutralVoteThread(id) : upVoteThread(id))}>
            {isThreadUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
          </button>
          <span>{upVotesBy.length}</span>

          <button type="button" aria-label="down vote" onClick={() => (isThreadDownVoted? neutralVoteThread(id) : downVoteThread(id))}>
            {isThreadDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
          </button>
          <span>{downVotesBy.length}</span>
        </div>

        <p className="thread-detail__created-at">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  neutralVoteThread: PropTypes.func.isRequired,
};

export default ThreadDetail;