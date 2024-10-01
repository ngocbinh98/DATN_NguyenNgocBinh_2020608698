import * as types from '../actionTypes';

export function getListProductAction(products, page, totalSize, type) {
  return {
    type: types.GET_LIST_PRODUCT,
    payload: {
      products,
      page,
      totalSize,
      type,
    },
  };
}
export function getCategoryAction(category) {
  return {
    type: types.GET_CATEGORY,
    payload: {
      category,
    },
  };
}
