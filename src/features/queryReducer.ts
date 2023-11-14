export enum ActionsType {
  SET_QUERY = 'SET_QUERY',
  CLEAR_QUERY = 'CLEAR_QUERY',
}

const initialState = {
  query: '',
};

export const actions = {
  setQuery: (query:string) => ({
    type: ActionsType.SET_QUERY,
    query,
  }),
  clearQuery: () => ({
    type: ActionsType.CLEAR_QUERY,
  }),
};

export const queryReducer = (
  state = initialState,
  action:{ type:ActionsType, query?:string },
) => {
  switch (action.type) {
    case ActionsType.SET_QUERY:
      return { ...state, query: action.query };

    case ActionsType.CLEAR_QUERY:
      return { ...state, query: '' };

    default: return state;
  }
};
