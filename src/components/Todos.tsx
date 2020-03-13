import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getPreparedTodos } from '../api';
import { ADD_TODO } from '../store';
import { State, PreparedTodo } from '../interfaces';
import { TodosList } from './TodosList';

interface Actions {
  setTodos: (todos: PreparedTodo[]) => void;
}

type Props = State & Actions;

const TodosTemplate: FC<Props> = ({ todos, setTodos }) => {
  const [isLoading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    const loadedTodos = await getPreparedTodos();

    setTodos(loadedTodos);
  };

  const filter = (field: string) => {
    const filteredTodos = [...todos];

    switch (field) {
      case 'sortByTitle':
        setTodos(filteredTodos
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByName':
        setTodos(filteredTodos
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'sortByCompleted':
        setTodos(filteredTodos
          .sort((a, b) => b.completed.toString().localeCompare(a.completed.toString())));
        break;
      default:
    }
  };

  if (!todos.length) {
    return (
      <button
        type="button"
        onClick={loadTodos}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Load'}
      </button>
    );
  }

  return (
    <>
      <h1>Dinamic list of todos</h1>
      <button type="button" onClick={() => filter('sortByTitle')}>
        Sort by title
      </button>
      <button type="button" onClick={() => filter('sortByName')}>
        Sort by name
      </button>
      <button type="button" onClick={() => filter('sortByCompleted')}>
        Sort by completed
      </button>
      <TodosList todos={todos} />
    </>
  );
};

const mapStateProps = (state: State) => ({
  todos: state.todos,
});

const mapDispatchProps = (dispatch: Dispatch) => ({
  setTodos: (todos: PreparedTodo[]) => dispatch({
    type: ADD_TODO,
    value: todos,
  }),
});

export const Todos = connect(mapStateProps, mapDispatchProps)(TodosTemplate);
