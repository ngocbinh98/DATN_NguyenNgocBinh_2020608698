import * as type from '../actionTypes';

export function getUserAction(users) {
  return {
    type: type.GET_LIST_USER,
    payload: {
      users,
    },
  };
}
