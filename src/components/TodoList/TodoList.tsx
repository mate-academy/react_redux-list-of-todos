/* eslint-disable max-len */
import React, { useCallback, memo, useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filteredTodosSelector, openTodo } from '../../features/todo/todoSlice';
import { fetchUser } from '../../features/user/userSlice';
import { openModal } from '../../features/modal/modalSlice';

export const TodoList: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { selectedTodo } = useAppSelector(state => state.todo);
  const visibleTodos = useAppSelector(filteredTodosSelector);
  const { searchValue } = useAppSelector(state => state.filter);

  const handleOpen = useCallback((todoId: number, userId: number) => {
    dispatch(openTodo(todoId));
    dispatch(fetchUser(userId));
    dispatch(openModal());
  }, [dispatch]);

  const noTodosInFilter = useMemo(() => (
    searchValue && !visibleTodos.length
  ), [searchValue, visibleTodos]);

  return (
    <>
      {noTodosInFilter && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {!noTodosInFilter && (
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
        )}

        <tbody>
          {visibleTodos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({
                'has-background-info-light': selectedTodo === todo,
              })}
            >
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
                  onClick={() => handleOpen(todo.id, todo.userId)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      {
                        'fa-eye': selectedTodo !== todo,
                        'fa-eye-slash': selectedTodo === todo,
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
});
