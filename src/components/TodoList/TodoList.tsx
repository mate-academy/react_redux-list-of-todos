/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { visibleArray } from '../../utils/visibleArray';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);
  const { filter } = useAppSelector(state => state.filter);

  const todosVisible = visibleArray(todos, filter, query);

  return (
    <>
      {!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th aria-label="th">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th aria-label="th"> </th>
          </tr>
        </thead>

        <tbody>
          {
            todosVisible.map(todo => {
              const isSelectedTodo = selectedTodo?.id === todo.id;

              return (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>

                  {!todo.completed
                    ? (
                      <td className="is-vcentered" />
                    )
                    : (
                      <td className="is-vcentered">
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      </td>
                    )}
                  <td className="is-vcentered is-expanded">
                    <p
                      className={todo.completed
                        ? 'has-text-success'
                        : 'has-text-danger'}
                    >
                      {todo.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch({
                        type: 'currentTodo/SET',
                        payload: todo,
                      })}
                    >
                      <span className="icon">
                        <i className={cn('far',
                          {
                            'fa-eye': !isSelectedTodo,
                            'fa-eye-slash': isSelectedTodo,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};
