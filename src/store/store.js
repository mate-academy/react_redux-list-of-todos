import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const API_URL = 'https://jsonplaceholder.typicode.com';

const ACTION_TYPES = {
  ADD_DATA: 'DATA::ADD',
  LOAD_DATA: 'LOAD::ADD',
  SORT_DATA: 'SORT::DATA',
  COMPLETE_DATA: 'COMPLETE_DATA',
};

export const addData = data => ({
  type: ACTION_TYPES.ADD_DATA,
  payload: data,
});

export const sortData = data => ({
  type: ACTION_TYPES.SORT_DATA,
  payload: data,
});

export const completeData = data => ({
  type: ACTION_TYPES.COMPLETE_DATA,
  payload: data,
});

const loadData = data => ({
  type: ACTION_TYPES.LOAD_DATA,
  payload: data,
});

const initialState = {
  data: [],
  isLoading: false,
  isReady: true,
};

export const getData = () => (dispatch) => {
  store.dispatch(loadData());
  Promise.all([
    fetch(`${API_URL}/todos`),
    fetch(`${API_URL}/users`),
  ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([todos, users]) => store.dispatch(addData(todos.map(todo => (
      {
        ...todo,
        user: users.find(person => person.id === todo.userId),
      }
    ))),
    store.dispatch(loadData())));
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.ADD_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case ACTION_TYPES.LOAD_DATA: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case ACTION_TYPES.SORT_DATA: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => (a.title.localeCompare(b.title)
        )),
      };
    }
    case ACTION_TYPES.COMPLETE_DATA: {
      return {
        ...state,
        data: [...state.data].sort((a, b) => b.completed - a.completed),
      };
    }
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
