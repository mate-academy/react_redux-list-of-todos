/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterParams = useAppSelector(state => state.filter);

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const filteredTodos = useMemo(() => {
    const filterTodos = todos.filter(todo => {
      const preperedTodo = todo.title.toLowerCase();
      const preperedQuery = filterParams.query.toLowerCase();

      return preperedTodo.includes(preperedQuery);
    });

    switch (filterParams.status) {
      case 'all':
        return filterTodos;
      case 'active':
        return filterTodos.filter(todo => todo.completed === false);
      case 'completed':
        return filterTodos.filter(todo => todo.completed === true);
      default:
        return filterTodos;
    }
  }, [todos, filterParams]);

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed
                  ? (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  ) : (
                    <td className="is-vcentered" />
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
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setTodo(todo)}
                  >
                    <span className="icon">
                      {currentTodo?.id === todo.id
                        ? (<i className="far fa-eye-slash" />
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
