import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const cartSelector = (state) => state.Cart;

const selectCartItemSelector = createSelector(cartSelector, (state) => state.cartItems);

export const selectCartItems = (state) => {
  return selectCartItemSelector(state);
};
