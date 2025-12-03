/* eslint-disable */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const selectedTodo = (value: Todo) => {
    if (value.id === currentTodo?.id) {
      dispatch(currentTodoSlice.actions.deleteTodo(null));

      return;
    }

    dispatch(currentTodoSlice.actions.currentTodo(value));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [todos, query, status]);

  return (
    <>
      {filteredTodos.length === 0 ? (
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
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => {
              return (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={cn(
                    currentTodo?.id === todo.id
                      ? 'has-background-info-light'
                      : '',
                  )}
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
                      className={cn(
                        'has-text',
                        todo.completed ? 'has-text-success' : 'has-text-danger',
                      )}
                    >
                      {todo.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => selectedTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn(
                            'far',
                            currentTodo?.id === todo.id
                              ? 'fa-eye-slash'
                              : 'fa-eye',
                          )}
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
