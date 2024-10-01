import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const PurchaseSelector = (state) => state.Purchase;

const selectIsPurchaseSelector = createSelector(PurchaseSelector, (state) => state.isPurchase);
const selectPurchaseItemSelector = createSelector(PurchaseSelector, (state) => state.purchaseItem);
const selectIsProductSelector = createSelector(PurchaseSelector, (state) => state.isProduct);

export const selectIsPurchase = (state) => {
  return selectIsPurchaseSelector(state);
};
export const selectPurchaseItem = (state) => {
  return selectPurchaseItemSelector(state);
};
export const selectIsProduct = (state) => {
  return selectIsProductSelector(state);
};
