import React, { FC, useMemo } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Todo } from './Todo';
import * as actions from '../redux/actions';

interface Props {
  todos: Todo[];
  query: string;
  setDeleteTodo: (id: number) => void;
}

export const TodoListTemplate: FC<Props> = ({ todos, query, setDeleteTodo }) => {
  const todosToShow = useMemo(() => {
    if (!todos.length) {
      return [];
    }

    switch (query) {
      case 'title':
        return todos.sort((a, b) => a.title.localeCompare(b.title));

      case 'user':
        return todos
          .sort((a, b) => {
            if (a.user && b.user) {
              return a.user.name.localeCompare(b.user.name);
            }

            return 0;
          });

      case 'completed':
        return todos
          .sort((a, b) => {
            return Number(a.completed) - Number(b.completed);
          });

      case 'reverse': {
        return todos.reverse();
      }

      default:
        return todos;
    }
  }, [query, todos]);

  return (
    <>
      <h1>Todo List</h1>
      <ul className="card-list">
        {todosToShow.map(todo => (
          <li className="card-item" key={todo.id}>
            <Todo {...todo} deleteTodo={setDeleteTodo} />
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state: { todosReducer: TodoState; queryReducer: QuerySort }) => ({
  todos: state.todosReducer.todos,
  query: state.queryReducer.query,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setDeleteTodo: (id: number) => dispatch(
      actions.setDeleteTodo(id),
    ),
  };
};

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListTemplate);
