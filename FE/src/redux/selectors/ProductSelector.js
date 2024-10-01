import { createSelector } from '@reduxjs/toolkit';

/** Selector **/
const productSelector = (state) => state.Product;
// const totalSizeSelector = (state) => state.totalSize;
// const pageSelector = (state) => state.page;
// const categorySelector = (state) => state.category;
// const typeSelector = (state) => state.type;

const selectProductSelector = createSelector(productSelector, (state) => state.products);
const selectTotalSizeSelector = createSelector(productSelector, (state) => state.totalSize);
const selectPageSelector = createSelector(productSelector, (state) => state.page);
const selectCategorySelector = createSelector(productSelector, (state) => state.category);
const selectTypeSelector = createSelector(productSelector, (state) => state.type);

export const selectProducts = (state) => {
  return selectProductSelector(state);
};
export const selectPage = (state) => {
  return selectPageSelector(state);
};
export const selectTotalSize = (state) => {
  return selectTotalSizeSelector(state);
};
export const selectCategory = (state) => {
  return selectCategorySelector(state);
};
export const selectType = (state) => {
  return selectTypeSelector(state);
};
// const selectPageSelector = createSelector(
//     filmSelector,
//     state => state.page);

//  const selectSizeSelector = createSelector(
//     filmSelector,
//     state => state.size);

// const selectSelectedRowsSelector = createSelector(
//     filmSelector,
//     state => state.selectedRows);
/** function */

// export const selectSize = (state) => {
//     return selectSizeSelector(state);
// }

// export const selectSelectedRows = (state) => {
//     return selectSelectedRowsSelector(state);
// }
