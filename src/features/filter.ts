// export const actions = { /* put action creators here */};

// const filterReducer = () => {
//   return {
//     query: '',
//     status: 'all',
//   };
// };

// export default filterReducer;
import { Status } from '../types/Status';

type StateType = {
  searchedTitle: string;
  selectedStatus: Status;
};

type SetTodosQueryAction = {
  type: 'todos/CHANGEQUERY';
  payload: string;
};

type SetTodosStatusAction = {
  type: 'todos/CHANGESTATUS';
  payload: string;
};

type ActionsType = SetTodosQueryAction | SetTodosStatusAction;

const initialState: StateType = {
  searchedTitle: '',
  selectedStatus: Status.all,
};

const setTodosQuery = (searchedTitle: string) => ({
  type: 'todos/CHANGEQUERY',
  payload: searchedTitle,
});

const setTodosStatus = (selectedStatus: Status) => ({
  type: 'todos/CHANGESTATUS',
  payload: selectedStatus,
});

export const actions = { setTodosQuery, setTodosStatus };

const filterReducer = (
  state: StateType = initialState,
  action: ActionsType,
) => {
  switch (action.type) {
    case 'todos/CHANGEQUERY':
      return {
        ...state,
        searchedTitle: action.payload,
      };
    case 'todos/CHANGESTATUS':
      return {
        ...state,
        selectedStatus: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
