import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const categorySelector = (state) => state.Category;

const selectCategorySelector = createSelector(categorySelector, (state) => state.categories);

export const selectCategory = (state) => {
  return selectCategorySelector(state);
};
