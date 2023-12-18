import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(store => store.currentTodo);

  const handleTodoSelection = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {!todos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ) : (
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
                <th aria-label="empty"> </th>
              </tr>
            </thead>

            <tbody>
              {todos.map(todo => (
                <tr
                  data-cy="todo"
                  className={todo === currentTodo
                    ? 'has-background-info-light'
                    : ''}
                  key={todo.id}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  {todo.completed ? (
                    <td aria-label="Icon Completed" className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td aria-label="empty" className="is-vcentered" />
                  )}
                  <td className="is-vcentered is-expanded">
                    <p className={todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'}
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
                      onClick={() => handleTodoSelection(todo)}
                    >
                      <span className="icon">
                        <i className={`far ${todo === currentTodo
                          ? 'fa-eye-slash'
                          : 'fa-eye'}`}
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
