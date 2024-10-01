import * as typess from '../actionTypes';

const initialState = {
  users: [],
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case typess.GET_LIST_USER:
      return {
        ...state,
        users: actions.payload.users,
      };
    default:
      return state;
  }
}
