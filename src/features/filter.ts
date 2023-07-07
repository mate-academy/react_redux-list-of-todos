export interface PayloadType {
  query: string;
  select: string;
}

interface Action {
  type: string,
  payload: PayloadType,
}

export const actions = {
  setFilter: (data: PayloadType) => ({
    type: 'set',
    payload: data,
  }),
};

const filterReducer = (state = null, action: Action) => {
  if (action.payload) {
    return action.payload;
  }

  return state;
};

export default filterReducer;
