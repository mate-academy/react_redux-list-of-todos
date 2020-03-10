import React, { FC } from 'react';
import {createStore} from 'redux';
import { connect, Provider } from 'react-redux';

import { getUsers, getTodos } from './api/DataFromServer';
import { UserList } from './components/UserList/UserList';
import './App.css';

const initialState = {
  prepearedTodoList: [],
  isLoaded: false,
};
const TYPE_IS_LOAD = 'isLoaded';
const PREPEARD_TOTO_LIST = 'prepearedTodoList';

const isLoadedType = (value: boolean) => ({
  type: TYPE_IS_LOAD,
  value,
});

const PrepearedTodoListType = (value: TodoWithUser[]) => ({
  type: PREPEARD_TOTO_LIST,
  value,
});

// interface ReducerTodoState {
//   prepearedTodoList: TodoWithUser;
//   isLoaded: boolean;
// }

// interface ReducerTodo {
//   state: {
//     prepearedTodoList: TodoWithUser;
//     isLoaded: boolean;
//   },
//   action: any;
// }

const reducerTodo = (state: any, action: any) => {
  if (action.type === 'isLoaded') {
    return {
      ...state,
      isLoaded: action.value,
    };
  }

  if (action.type === 'prepearedTodoList') {
    return {
      ...state,
      prepearedTodoList: action.value,
    };
  }

  return state;
};

const store = createStore(reducerTodo, initialState);


interface State {
  prepearedTodoList: TodoWithUser;
  isLoaded: boolean;
}

const getData = (state: State) => ({
  isLoaded: state.isLoaded,
  prepearedTodoList: state.prepearedTodoList,
});

const getMethods = (dispatch: any) => ({
  loadUsers: () => {
    dispatch(isLoadedType(true));

    Promise.all([getUsers(), getTodos()])
      .then(([user, todo]) => {
        const todoWithUser = todo.map(todoItem => (
          {
            ...todoItem,
            user: user.find(userItem => userItem.id === todoItem.userId) as User,
          }
        ));

        dispatch(isLoadedType(false));
        dispatch(PrepearedTodoListType(todoWithUser));
      });
  },
});

const Child = ({ loadUsers, isLoaded, prepearedTodoList }: any) => {
  return (
    <>
      {
        prepearedTodoList.length === 0
          ? (
            <button
              type="button"
              onClick={loadUsers}
              disabled={isLoaded}
              className="load-btn"
            >
              Load
            </button>
          )
          : <UserList prepearedTodoList={prepearedTodoList} />
      }
      {isLoaded && (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
}

const ConnectedChild = connect(getData, getMethods)(Child);

const App: FC = () => {
  return (
    <Provider store={store}>
      <ConnectedChild />
    </Provider>
  );
};

export default App;


