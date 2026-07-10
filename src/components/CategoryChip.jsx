import React from 'react';
import PropTypes from 'prop-types';

function CategoryChip({
  category,
  count,
  isActive,
  onSelect,
}) {
  return (
    <button
      type="button"
      className={isActive ? 'category-chip category-chip--active' : 'category-chip'}
      aria-pressed={isActive}
      onClick={() => onSelect(category)}
    >
      <span className="category-chip__name">
        #
        {category}
      </span>
      <span className="category-chip__count">{count}</span>
    </button>
  );
}

CategoryChip.propTypes = {
  category: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoryChip;
