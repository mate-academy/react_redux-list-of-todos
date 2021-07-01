export const SET = 'titleFilter/set';
export const CLEAR = 'titleFilter/clear';

export const actions = {
  [SET]: (value) => ({ type: SET, value }),
  [CLEAR]: () => ({ type: CLEAR }),
}

const titleFilterReducer = (titleFilter = '', action) => {
  switch (action.type) {
    case SET:
      return action.value;

    case CLEAR:
      return '';
  
    default:
      return titleFilter;
  }
}

export default titleFilterReducer;
