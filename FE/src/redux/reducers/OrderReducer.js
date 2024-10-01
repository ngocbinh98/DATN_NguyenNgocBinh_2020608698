import * as types from '../actionTypes';

const initialState = {
  orders: [],
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_ORDER:
      return {
        ...state,
        orders: actions.payload.orders,
      };
    default:
      return state;
  }
}
