export interface Payload {
  status: string;
  query: string;
}

type SetFilterAction = {
  type: 'filter/SET';
  payload: Payload;
};

const setFilter = (filter: Payload): SetFilterAction => ({
  type: 'filter/SET',
  payload: filter,
});

export const actions = { setFilter };

type State = Payload;
type Action = SetFilterAction;

const filterReducer = (
  state: State = { status: 'all', query: '' },
  action: Action,
) => {
  switch (action.type) {
    case 'filter/SET':
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
