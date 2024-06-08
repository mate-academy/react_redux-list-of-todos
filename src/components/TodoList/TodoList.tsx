/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { State } from '../../features/filter';
import classNames from 'classnames';
import { actions as currentTodoActions } from '../../features/currentTodo';

function getFilteredTodos(todos: Todo[], filterBy: State) {
  let filteredTodos = todos;

  if (filterBy.query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(filterBy.query.toLowerCase()),
    );
  }

  switch (filterBy.status) {
    case 'active':
      return filteredTodos.filter(todo => !todo.completed);

    case 'completed':
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const filteredTodos = getFilteredTodos(todos, filter);

  if (!filteredTodos.length && filter.query) {
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
          {filteredTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': id === currentTodo?.id,
                })}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames({
                          'far fa-eye-slash': id === currentTodo?.id,
                          'far fa-eye': id !== currentTodo?.id,
                        })}
                      />
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
