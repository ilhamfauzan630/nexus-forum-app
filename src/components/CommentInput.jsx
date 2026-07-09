import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  function onContentChange({ target }) {
    if (target.value.length <= 320) {
      setContent(target.value);
    }
  }

  function onAddComment() {
    if (!content.trim()) {
      return;
    }

    addComment(content);
    setContent('');
  }

  return (
    <div className="comment-input">
      <p className="comment-input__title">Add your voice</p>

      <textarea
        className="comment-input__textarea"
        placeholder="Write your comment..."
        value={content}
        onChange={onContentChange}
      />

      <p className="comment-input__char-left">
        <strong>{content.length}</strong>
        /320
      </p>

      <button type="button" className="comment-input__button" onClick={onAddComment}>
        Add Comment
      </button>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
