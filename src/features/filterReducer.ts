export enum ActionsType {
  SET_STATUS = 'SET_STATUS',
}
const initialState = {
  status: 'all',
};

export const actions = {
  setStatus: (status:string) => ({
    type: ActionsType.SET_STATUS,
    status,
  }),
};

export const filterReducer = (
  state = initialState,
  action:{ type:ActionsType, status:string },
) => {
  switch (action.type) {
    case ActionsType.SET_STATUS:
      return { ...state, status: action.status };

    default: return state;
  }
};
