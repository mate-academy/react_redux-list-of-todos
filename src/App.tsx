import React, { FC, MouseEvent, useMemo } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { setLoading, setTodos, setSort } from './actions/actions';
import { getPreparedTodos } from './api/api';
import { sort } from './utils/utils';

interface Props {
  setLoad: (value: boolean) => void;
  setNewTodos: (value: TodoWithUser[]) => void;
  setSortBy: (value: string) => void;
  todos: TodoWithUser[];
  isLoading: boolean;
  sortBy: string;

}

const App: FC<Props> = ({
  setLoad,
  setNewTodos,
  setSortBy,
  todos,
  sortBy,
  isLoading,
}) => {
  const loadHandler = () => {
    setLoad(true);
    getPreparedTodos().then(preparedTodos => {
      setNewTodos(preparedTodos);
    });
  };

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setSortBy(name);
  };

  const filteredTodos = useMemo(() => sort(sortBy, todos), [sortBy, todos]);

  if (!todos.length) {
    return (
      <div className="button-container">
        <h1>Dynamic list of TODOs</h1>
        <button
          className="button"
          type="button"
          disabled={isLoading}
          onClick={loadHandler}
        >
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of TODOs</h1>
      <p>
        <span>Todos: </span>
        {todos.length}
      </p>
      <div className="buttons-container">
        <button
          className="button"
          name="title"
          type="button"
          onClick={clickHandler}
        >
          Sort by title
        </button>
        <button
          className="button"
          name="name"
          type="button"
          onClick={clickHandler}
        >
          Sort by name
        </button>
        <button
          className="button"
          name="completed"
          type="button"
          onClick={clickHandler}
        >
          Sort by completed
        </button>
      </div>
      <TodoList todos={filteredTodos} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  todos: state.todos,
  isLoading: state.isLoading,
  sortBy: state.sortBy,
});

const mapDispatchToProps = {
  setLoad: setLoading,
  setNewTodos: setTodos,
  setSortBy: setSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
