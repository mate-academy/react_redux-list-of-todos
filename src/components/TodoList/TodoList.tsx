import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(store => store.currentTodo);

  const handleCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!todos.length && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th aria-label="icon">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th aria-label="no"> </th>
            </tr>
          </thead>

          <tbody>
            {todos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn({
                  'has-background-info-light': todo === currentTodo,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed && (
                  <td aria-label="Icon Completed" className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )}

                {!todo.completed && (
                  <td aria-label="empty" className="is-vcentered" />
                )}

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn(
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
                    aria-label="Select Button"
                    className="button"
                    type="button"
                    onClick={() => handleCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i className={cn(
                        'far',
                        { 'fa-eye-slash': todo === currentTodo },
                        { 'fa-eye': todo !== currentTodo },
                      )}
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
