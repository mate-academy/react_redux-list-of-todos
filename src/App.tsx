import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TodoList } from './components/TodoList';
import './App.css';
import { getTodos, getUsers } from './api/getData';
import { Actions } from './components/Actions';
import * as actions from './redux/actions';

interface Methods {
  setIsLoaded: (status: boolean) => void;
  setIsLoading: (status: boolean) => void;
  setTodos: (todos: Todo[]) => void;
}

type Props = Methods & {
  isLoaded: boolean;
  isLoading: boolean;
};


const AppTemplate: FC<Props> = ({
  isLoaded, isLoading, setIsLoaded,
  setIsLoading, setTodos,
}) => {
  async function handleStart() {
    setIsLoaded(true);
    setIsLoading(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    setTodos(todosFromServer.map((todo) => (
      {
        ...todo,
        user: usersFromServer
          .find((user) => user.id === todo.userId),
      })));

    setIsLoading(false);
  }

  return (
    <>
      {isLoaded
    && (
      <Actions />
    )}

      {!isLoaded
     && (
       <button
         className="button"
         type="button"
         onClick={handleStart}
       >
       Press to start
       </button>
     )}
      {isLoading ? <p>Loading...</p> : <TodoList />}
    </>
  );
};

const mapStateToProps = (state: { loadReducer: LoadState }) => {
  return {
    isLoaded: state.loadReducer.isLoaded,
    isLoading: state.loadReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setIsLoaded: (status: boolean) => dispatch(actions.setIsLoaded(status)),
    setIsLoading: (status: boolean) => dispatch(actions.setIsLoading(status)),
    setTodos: (todos: Todo[]) => dispatch(actions.setTodos(todos)),
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppTemplate);
