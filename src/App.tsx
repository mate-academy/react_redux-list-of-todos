import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { todosPreparer } from './api/utils/todosPrepader';
import {
  setIsLoadind,
  setTodos,
  setSortType,
} from './store/actionCreators';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

interface Props extends RootState {
  setIsLoadind: (value: boolean) => void;
  setTodos: (todos: PreparedTodo[]) => void;
  setSortType: (sortType: string) => void;
}

export const AppTemplate: FC<Props> = (props) => {
  const {
    isLoading,
    typeOfSort,
    todos,
    // eslint-disable-next-line no-shadow
    setIsLoadind,
    // eslint-disable-next-line no-shadow
    setTodos,
    // eslint-disable-next-line no-shadow
    setSortType,
  } = props;

  const handleLoadButton = async () => {
    setIsLoadind(true);
    const todosPrepared = await todosPreparer();

    setTodos(todosPrepared);

    return todosPrepared;
  };

  const sortedTodo = useMemo(() => {
    switch (typeOfSort) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...todos]
          .sort((todoA, todoB) => (Number(todoB.completed) - Number(todoA.completed)));
      case 'user':
        return [...todos].sort((a, b) => a.user.name.localeCompare(b.user.name));
      default:
        return todos;
    }
  }, [todos, typeOfSort]);

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {todos.length === 0
        ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleLoadButton}
            className="button"
          >
            {isLoading ? (<>Loading...</>) : <>Load Todos</>}
          </button>
        )
        : (
          <>
            <button
              className="button"
              type="button"
              onClick={() => setSortType('title')}
            >
              sort by title
            </button>
            <button
              className="button"
              type="button"
              onClick={() => {
                setSortType('completed');
              }}
            >
              sort by status
            </button>
            <button
              className="button"
              type="button"
              onClick={() => setSortType('user')}
            >
              by user name
            </button>
            <TodoList todos={sortedTodo} />
          </>
        )}
    </>
  );
};

const mapState = (state: RootState) => ({
  isLoading: state.isLoading,
  todos: state.todos,
  typeOfSort: state.typeOfSort,
});

const mapDispatch = {
  setIsLoadind,
  setTodos,
  setSortType,
};

export const App = connect(
  mapState,
  mapDispatch,
)(AppTemplate);
