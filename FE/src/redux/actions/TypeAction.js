import * as type from '../actionTypes';

export function getTypeAction(types) {
  return {
    type: type.GET_LIST_TYPE,
    payload: {
      types,
    },
  };
}
