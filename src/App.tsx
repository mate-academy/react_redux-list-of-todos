import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TodoList } from './components/TodoList';
import './App.css';
import { getTodos, getUsers } from './api/getData';
import { Actions } from './components/Actions';

interface Methods {
  setIsLoaded: () => void;
  setIsLoading: (status: boolean) => void;
  setTodos: (todos: Todo[]) => void;
}

type Props = GlobalState & Methods;


const AppTemplate: FC<Props> = ({
  isLoaded, isLoading, setIsLoaded,
  setIsLoading, setTodos,
}) => {
  async function handleStart() {
    setIsLoaded();
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

const mapStateToProps = (state: GlobalState) => {
  return {
    ...state,
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch:
(arg0: { type: string; isLoaded?: boolean; isLoading?: boolean; todos?: Todo[] }) => unknown) => {
  return {
    setIsLoaded: () => dispatch({ type: 'SET_IS_LOADED', isLoaded: true }),
    setIsLoading: (status: boolean) => dispatch({ type: 'SET_IS_LOADING', isLoading: status }),
    setTodos: (todos: Todo[]) => dispatch({ type: 'SET_TODOS', todos: [...todos] }),
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppTemplate);
