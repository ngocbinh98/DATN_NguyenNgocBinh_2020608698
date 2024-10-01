import * as typess from '../actionTypes';

const initialState = {
  types: [],
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case typess.GET_LIST_TYPE:
      return {
        ...state,
        types: actions.payload.types,
      };
    default:
      return state;
  }
}
