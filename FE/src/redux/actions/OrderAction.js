import * as types from '../actionTypes';

export function getOrderAction(orders) {
  return {
    type: types.GET_LIST_ORDER,
    payload: {
      orders,
    },
  };
}
