import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function onTitleChange({ target }) {
    setTitle(target.value);
  }

  function onBodyChange({ target }) {
    setBody(target.value);
  }

  function onCategoryChange({ target }) {
    setCategory(target.value);
  }

  function onAddThread() {
    if (!title.trim() || !body.trim() || !category.trim()) {
      return;
    }

    addThread({
      title,
      body,
      category,
    });

    setTitle('');
    setBody('');
    setCategory('');
  }

  return (
    <div className="thread-input">
      <div className="thread-input__header">
        <p className="thread-input__eyebrow">Start a thread</p>
        <h2>What is happening?</h2>
      </div>

      <input
        type="text"
        className="thread-input__field"
        placeholder="Thread title"
        value={title}
        onChange={onTitleChange}
      />

      <input
        type="text"
        className="thread-input__field"
        placeholder="Category"
        value={category}
        onChange={onCategoryChange}
      />

      <textarea
        className="thread-input__textarea"
        placeholder="Write your thread..."
        value={body}
        onChange={onBodyChange}
      />

      <button type="button" className="thread-input__button" onClick={onAddThread}>
        Create Thread
      </button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
