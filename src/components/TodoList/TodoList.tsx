/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const query = useAppSelector((state) => state.filter.query);
  const status = useAppSelector((state) => state.filter.status);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useDispatch();

  const getFilteredTodos = () => {
    let filteredTodos = [...todos];

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      filteredTodos = filteredTodos.filter(({ title }) => title.toLowerCase().includes(normalizedQuery));
    }

    if (status) {
      switch (status) {
        case 'completed':
          filteredTodos = filteredTodos.filter(todo => todo.completed);
          break;

        case 'active':
          filteredTodos = filteredTodos.filter(todo => !todo.completed);
          break;

        default:
          break;
      }
    }

    return filteredTodos;
  };

  const openModal = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!getFilteredTodos() && (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
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
          {getFilteredTodos().map((todo: Todo) => (
            <tr data-cy="todo" className={classNames({ 'has-background-info-light': currentTodo })}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                )}
              </td>
              <td className="is-vcentered"> </td>

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
                  onClick={() => openModal(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far', {
                        'fa-eye': currentTodo?.id !== todo.id,
                        'fa-eye-slash': currentTodo?.id === todo.id,
                      },
                    )}
                    />
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
