import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const userSelector = (state) => state.User;

const selectUserSelector = createSelector(userSelector, (state) => state.users);

export const selectUsers = (state) => {
  return selectUserSelector(state);
};
