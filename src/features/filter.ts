export const ActiveTodos = 'activeTodos';
export const CompletedTodos = 'completedTodos';
export const AllTodos = 'allTodos';
export const changeQuery = 'changeQuery';

export const Filter = (type: string, payload: string) => ({type , payload });
export const Query = (payload: string) => ({type: changeQuery ,  payload });

interface Action {
  type: string;
  payload: string;
}

type DefaultValue = {
  status: string;
  query: string;
};

const defaultValue: DefaultValue = {
  status: AllTodos,
  query: '',
};

const filterReducer = ( action: Action , state :DefaultValue = defaultValue ): DefaultValue => {
  switch (action.type) {
    case ActiveTodos:
      return { ...state, status: action.payload };
    case CompletedTodos:
      return { ...state, status: action.payload };
    case AllTodos:
      return { ...state, status: action.payload };
    case changeQuery:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};

export default filterReducer;
