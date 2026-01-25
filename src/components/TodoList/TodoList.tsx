/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Status as FilterStatus } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { setCurrentTodo, clearCurrentTodo } from '../../features/currentTodo';

const filtredTodos = (
  filterStatus: FilterStatus,
  query: string,
  todos: Todo[],
) => {
  const todosByFilter = todos.filter(todo => {
    switch (filterStatus) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return todo;
    }
  });

  const todosByQuery = todosByFilter.filter(todo => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return todosByQuery;
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todosFromState = useAppSelector(state => state.todos);
  const filterStatus = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const todos = filtredTodos(filterStatus, query, todosFromState);

  if (todos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map(todo => {
            return (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      if (currentTodo?.id === todo.id) {
                        dispatch(clearCurrentTodo());
                      } else {
                        dispatch(setCurrentTodo(todo));
                      }
                    }}
                  >
                    <span className="icon">
                      {currentTodo?.id === todo.id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
