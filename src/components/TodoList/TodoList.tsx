/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  let visibleTodos = todos.filter(todo => (
    todo.title.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase())
  ));

  const addTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  switch (filter.status) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return (
    <>
      {!visibleTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span
                  className="icon"
                >
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {visibleTodos.map(({
              id,
              title,
              completed,
              userId
            }) => (
              <tr data-cy="todo" key={id}>
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
                    className={classNames(
                      {
                        'has-text-danger': !completed,
                        'has-text-success': completed,
                      },
                    )}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => addTodo({
                      id,
                      title,
                      completed,
                      userId,
                    })}
                  >
                    <span
                      className="icon"
                      data-cy="iconCompleted"
                    >
                      <i
                        className="far fa-eye"
                      />
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
