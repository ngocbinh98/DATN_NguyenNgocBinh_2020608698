import * as types from '../actionTypes';

export function getCartItemAction(cartItems) {
  return {
    type: types.GET_CART_ITEM,
    payload: {
      cartItems,
    },
  };
}
