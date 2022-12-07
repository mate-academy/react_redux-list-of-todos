type ChangeStatusAction = { type: 'filter/STATUS', payload: string };
type ChangeQueryAction = { type: 'filter/QUERY', payload: string };

type Action = ChangeStatusAction | ChangeQueryAction;

const changeStatus = (value: string): ChangeStatusAction => ({
  type: 'filter/STATUS',
  payload: value,
});

const changeQuery = (value: string): ChangeQueryAction => ({
  type: 'filter/QUERY',
  payload: value,
});

type Initial = {
  query: string,
  status: string,
};

const initialValue: Initial = { query: '', status: 'all' };

const filterReducer = (
  filter: Initial = initialValue,
  action: Action,
): Initial => {
  switch (action.type) {
    case 'filter/STATUS':
      return { ...filter, status: action.payload };
    case 'filter/QUERY':
      return { ...filter, query: action.payload };
    default:
      return filter;
  }
};

export const actions = { changeStatus, changeQuery };
export default filterReducer;
