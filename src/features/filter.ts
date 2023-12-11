type SetQueryAction = {
  type: 'query/SetQuery',
  payload: string,
};
type ClearQueryAction = {
  type: 'query/ClearQuery',
};

type SetStatusAction = {
  type: 'status/SetStatus',
  payload: string,
};

const SetQuery = (value: string):SetQueryAction => ({
  type: 'query/SetQuery',
  payload: value,
});
const ClearQuery = ():ClearQueryAction => ({
  type: 'query/ClearQuery',
});

const SetStatus = (value: string):SetStatusAction => ({
  type: 'status/SetStatus',
  payload: value,
});

export const actions = { SetQuery, ClearQuery, SetStatus };

type Action = SetQueryAction | ClearQueryAction | SetStatusAction;

type InitVal = {
  query: string,
  status: string,
};
const initialValue = {
  query: '',
  status: 'all',
};

const filterReducer = (
  value:InitVal = initialValue,
  action:Action,
) => {
  switch (action.type) {
    case 'query/SetQuery':
      return {
        ...value, query: action.payload,
      };
    case 'query/ClearQuery':
      return {
        ...value, query: '',
      };
    case 'status/SetStatus':
      return {
        ...value, status: action.payload,
      };

    default:
      return value;
  }
};

export default filterReducer;
