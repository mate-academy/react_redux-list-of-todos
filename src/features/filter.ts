// type Active = { type: 'active', payload: string };
// type Completed = { type: 'completed', payload: string };
type Query = { type: 'query', payload: string };
type Status = { type: 'status', payload: string };



type Actions = Status | Query;

// // eslint-disable-next-line @typescript-eslint/naming-convention
// export type statusPayload = 'active' | 'completed' | 'all';

// const active = { type: 'active', payload: 'active' };
// const complete = { type: 'complete', payload: 'complete' };
const query = (searchWord: string): Query => (
  { type: 'query', payload: searchWord }
);

const status = (option: string): Status => (
  { type: 'status', payload: option }
);

type InitialState = {
  query: string;
  status: string;
};

const initialState: InitialState = {
  query: '',
  status: 'all',
};

const filterReducer = (
  state: InitialState = initialState,
  action: Actions,
): InitialState => {
  switch (action.type) {
    case 'status':
      return {
        ...state,
        status: action.payload,
      };
    case 'query':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export const actions = { status, query };

export default filterReducer;
