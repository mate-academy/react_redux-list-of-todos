const QUERY = 'filter/query';
const CLEAR = 'filter/clear';
const STATUS = 'filter/status';

enum EStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type TQueryAction = { type: typeof QUERY, payload: string };
type TStatusAction = { type: typeof STATUS, payload: EStatus };
type TClearAction = { type: typeof CLEAR };

type TAction = TQueryAction | TStatusAction | TClearAction;

interface IState {
  query: string;
  status: EStatus;
}

const initialState: IState = {
  query: '',
  status: EStatus.ALL,
};

const addQuery = (query: string) => ({ type: QUERY, payload: query });
const setStatus = (status: EStatus) => ({ type: STATUS, payload: status });
const clearQuery = () => ({ type: CLEAR });

const filterReducer = (state:IState = initialState, action: TAction) => {
  switch (action.type) {
    case QUERY: {
      return {
        ...state,
        query: action.payload,
      };
    }

    case STATUS: {
      return {
        ...state,
        status: action.payload,
      };
    }

    case CLEAR: {
      return {
        ...state,
        query: '',
      };
    }

    default: {
      return state;
    }
  }
};

export const actions = { addQuery, setStatus, clearQuery };
export { EStatus };
export default filterReducer;
