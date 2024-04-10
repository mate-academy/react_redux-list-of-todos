/* eslint-disable */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const handleSelect = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const filterTodos = useMemo(() => {
    let preparedTodos = [...todos];

    if (query) {
      preparedTodos = preparedTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (status) {
      case Status.Completed:
        return preparedTodos.filter(todo => todo.completed);
      case Status.Active:
        return preparedTodos.filter(todo => !todo.completed);
      case Status.All:
      default:
        return preparedTodos;
    }
  }, [query, todos, status]);

  const preparedTodos = filterTodos;

  return (
    <>
      {preparedTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
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
            {preparedTodos.map(todo => (
              <tr key={todo.id} data-cy="todo">
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
                    onClick={() => handleSelect(todo)}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': currentTodo?.id !== todo.id,
                          'fa-eye-slash': currentTodo?.id === todo.id,
                        })}
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
