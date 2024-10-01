import * as typess from '../actionTypes';

const initialState = {
  categories: [],
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case typess.GET_LIST_CATEGORY:
      return {
        ...state,
        categories: actions.payload.categories,
      };
    default:
      return state;
  }
}
