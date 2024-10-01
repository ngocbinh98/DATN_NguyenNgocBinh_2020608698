import * as type from '../actionTypes';

export function getCategoryAction(categories) {
  return {
    type: type.GET_LIST_CATEGORY,
    payload: {
      categories,
    },
  };
}
