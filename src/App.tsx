import React, { FC } from 'react';
import { connect } from 'react-redux';
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
    setIsLoading(true);

    const [
      todosFromServer,
      usersFromServer,
    ] = await Promise.all([
      getTodos(),
      getUsers(),
    ]).finally(() => setIsLoaded(true));

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
      {isLoaded ? (
        <>
          <Actions />
          <TodoList />
        </>
      ) : (
        <button
          className="button"
          type="button"
          onClick={handleStart}
        >
             Press to start
        </button>
      )}

      {isLoading && <p>Loading...</p>}
    </>
  );
};

const mapStateToProps = (
  state: {
    loadReducer: LoadState;
  },
) => ({
  isLoaded: state.loadReducer.isLoaded,
  isLoading: state.loadReducer.isLoading,
});

const mapDispatchToProps = {
  setIsLoaded: actions.setIsLoaded,
  setIsLoading: actions.setIsLoading,
  setTodos: actions.setTodos,
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTemplate);
