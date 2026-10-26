import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesStatus =
        status === 'all' || todo.completed === (status === 'completed');

      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleTodos.length > 0 && (
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
            {visibleTodos.map(todo => {
              const isSelected = currentTodo?.id === todo.id;

              return (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={classNames({
                    'has-background-info-light': isSelected,
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
                      className={
                        todo.completed ? 'has-text-success' : 'has-text-danger'
                      }
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() =>
                        dispatch(currentTodoSlice.actions.set(todo))
                      }
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': isSelected,
                            'fa-eye': !isSelected,
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
      )}
    </>
  );
};
