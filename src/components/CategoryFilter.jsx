import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CategoryChip from './CategoryChip';

const TAG_LIMIT = 8;

function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!categories.length) {
    return null;
  }

  const hasHiddenTags = categories.length > TAG_LIMIT;
  const visibleCategories = isExpanded
    ? categories
    : categories.slice(0, TAG_LIMIT);

  return (
    <section className="category-filter" aria-labelledby="category-filter-title">
      <div className="category-filter__header">
        <h2 id="category-filter-title">Popular Tags</h2>
      </div>

      <div className="category-filter__chips">
        {visibleCategories.map((category) => (
          <CategoryChip
            key={category.name}
            category={category.name}
            count={category.count}
            isActive={selectedCategory === category.name}
            onSelect={onSelectCategory}
          />
        ))}
      </div>

      {hasHiddenTags && (
        <button
          type="button"
          className="category-filter__toggle"
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </section>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
