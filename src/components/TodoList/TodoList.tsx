/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { FilterStatus } from '../../features/filter';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const getVisibleTodos = () => {
    let filteredTodos: Todo[] = [];

    switch (filter.status) {
      case FilterStatus.ALL:
        filteredTodos = todos;
        break;

      case FilterStatus.ACTIVE:
        filteredTodos = [...todos].filter(todo => !todo.completed);
        break;

      case FilterStatus.COMPLETED:
        filteredTodos = [...todos].filter(todo => todo.completed);
        break;

      default:
        return todos;
    }

    const todosByQuery = filteredTodos.filter((todo: Todo) => (
      todo.title.toLowerCase().includes(filter.query.toLowerCase())
    ));

    return todosByQuery;
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      {visibleTodos.length === 0
        && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}

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
          {visibleTodos.map(todo => (
            <tr data-cy="todo" key={todo.id + JSON.stringify(new Date())}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed
                  && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
                )}
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
                    dispatch(currentTodoActions.setTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
