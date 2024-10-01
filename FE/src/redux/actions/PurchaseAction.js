import * as types from '../actionTypes';

export function getPurchaseAction(isPurchase, purchaseItem, isProduct) {
  return {
    type: types.GET_PURCHASE,
    payload: {
      isPurchase,
      purchaseItem,
      isProduct,
    },
  };
}
