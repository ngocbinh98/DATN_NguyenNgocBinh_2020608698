import * as types from '../actionTypes';

const initialState = {
  products: [],
  page: 1,
  totalSize: 0,
  category: null,
  type: null,
  // size: 7,

  // selected rows
  //  selectedRows: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_PRODUCT:
      return {
        ...state,
        products: actions.payload.products,
        page: actions.payload.page,
        type: actions.payload.type,
        category: actions.payload.category,
        totalSize: actions.payload.totalSize,
        // // size: actions.payload.size,
      };
    case types.GET_CATEGORY:
      return {
        ...state,
        category: actions.payload.category,
      };
    default:
      return state;
  }
}
