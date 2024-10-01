import * as types from '../actionTypes';

const initialState = {
  isPurchase: false,
  purchaseItem: [],
  isProduct: 0,
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_PURCHASE:
      return {
        ...state,
        isPurchase: actions.payload.isPurchase,
        purchaseItem: actions.payload.purchaseItem,
        isProduct: actions.payload.isProduct,
      };
    default:
      return state;
  }
}
