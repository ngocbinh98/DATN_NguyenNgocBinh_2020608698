import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const OrderSelector = (state) => state.Order;

const selectListOrderSelector = createSelector(OrderSelector, (state) => state.orders);

export const selectOrders = (state) => {
  return selectListOrderSelector(state);
};
