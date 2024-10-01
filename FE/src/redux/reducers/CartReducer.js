import * as types from '../actionTypes';

const initialState = {
  cartItems: [],
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_CART_ITEM:
      return {
        ...state,
        cartItems: actions.payload.cartItems,
      };
    default:
      return state;
  }
}
