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
      <input
        type="text"
        placeholder="Thread title"
        value={title}
        onChange={onTitleChange}
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={onCategoryChange}
      />

      <textarea
        placeholder="Write your thread..."
        value={body}
        onChange={onBodyChange}
      />

      <button type="button" onClick={onAddThread}>
        Create Thread
      </button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;