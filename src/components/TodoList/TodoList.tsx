import React from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todosFilter = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.selectTodo(todo));
  };

  function getFilteredTodos(inheritTodos: Todo[]) {
    let filteredTodos = [...inheritTodos];
    const adaptedQuery = filter.query.trim().toLowerCase();

    switch (filter.status) {
      case Status.Active:
        filteredTodos = inheritTodos.filter(todo => !todo.completed);
        break;
      case Status.Completed:
        filteredTodos = inheritTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (adaptedQuery) {
      return filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(adaptedQuery),
      );
    }

    return filteredTodos;
  }

  const todos = getFilteredTodos(todosFilter);

  return (
    <>
      {!todos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {todos.map(({ id, completed, title, userId }) => (
              <tr
                data-cy="todo"
                key={id}
                className={classNames({
                  'has-background-info-light': currentTodo?.id === id,
                })}
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
                      'has-text-danger': !completed,
                      'has-text-success': completed,
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
                    onClick={() => handleSelectTodo({ id, completed, title, userId })}
                  >
                    <span className="icon">
                      {currentTodo?.id === id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
