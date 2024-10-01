import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const typeSelector = (state) => state.Type;

const selectTypeSelector = createSelector(typeSelector, (state) => state.types);

export const selectType = (state) => {
  return selectTypeSelector(state);
};
