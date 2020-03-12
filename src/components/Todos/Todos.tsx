import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TodoList } from '../TodoList/TodoList';
import { TodoWithUsers, State } from '../../interfaces';
import { getTodosWithUsers } from '../../api';
import { SET_TODOS } from '../../constants';

interface Actions {
  setTodos: (todos: TodoWithUsers[]) => void;
}

type Props = State & Actions;

const TodosTemplate: FC<Props> = ({ todos, setTodos }) => {
  const [isLoading, setIsLoading] = useState(false);


  const loadTodos = async () => {
    setIsLoading(true);

    const loadedTodos = await getTodosWithUsers();

    setTodos(loadedTodos);
  };

  const filter = (field: string) => {
    const visibleTodos = [...todos];

    switch (field) {
      case 'sortByTitle':
        setTodos(visibleTodos
          .sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'sortByName':
        setTodos(visibleTodos
          .sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'sortByCompleted':
        setTodos(visibleTodos
          .sort((a, b) => b.completed.toString()
            .localeCompare(a.completed.toString())));
        break;
      default:
    }
  };

  if (!todos.length) {
    return (
      <button
        className="start-button"
        type="button"
        onClick={loadTodos}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Load'}
      </button>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Static list of todos</h1>
      <div className="buttons">
        <button
          className="button"
          type="button"
          onClick={() => filter('sortByTitle')}
        >
        Sort by title
        </button>
        <button
          className=" button"
          type="button"
          onClick={() => filter('sortByName')}
        >
          Sort by name
        </button>
        <button
          className="button"
          type="button"
          onClick={() => filter('sortByCompleted')}
        >
          Sort by completed
        </button>
      </div>
      <p className="amount">{`Amount of todos: ${todos.length}`}</p>
      <TodoList todos={todos} />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todos: TodoWithUsers[]) => dispatch({
    type: SET_TODOS,
    value: todos,
  }),
});

export const Todos = connect(mapStateToProps, mapDispatchToProps)(TodosTemplate);
