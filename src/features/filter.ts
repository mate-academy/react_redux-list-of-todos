import { Status } from '../types/Status';

type QueryAction = { type:'filter/QUERY', payload:string };
type StatusAction = { type:'filter/STATUS', payload:Status };

const setStatus = (status:Status): StatusAction => (
  { type: 'filter/STATUS', payload: status }
);

const setQuery = (query: string): QueryAction => ({
  type: 'filter/QUERY',
  payload: query,
});

type Props = {
  query:string,
  status:Status,
};

type Action = QueryAction | StatusAction;

export const actions = { setQuery, setStatus };

const InitialState = {
  query: '',
  status: 'all' as Status,
};

const filterReducer = (filter: Props = InitialState, action: Action): Props => {
  switch (action.type) {
    case 'filter/STATUS':
      return {
        ...filter,
        status: action.payload,
      };

    case 'filter/QUERY':
      return {
        ...filter,
        query: action.payload.toLowerCase(),
      };

    default:
      return filter;
  }
};

export default filterReducer;
