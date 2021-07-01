export const SET = 'todosFiltering/set';

export const actions = {
  [SET]: (filter) => ({ type: SET, filter }),
}

const todosFilteringReducer = (todosFiltering = '', action) => {
  switch (action.type) {
    case SET:
      return action.filter;
  
    default:
      return todosFiltering;
  }
}

export default todosFilteringReducer;
