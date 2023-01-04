import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const visibleTodos: Todo[] = todos.filter(todo => {
    switch (filter.status) {
      case 'all':
        return todo;

      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return todo;
    }
  }).filter(todo => {
    const titleToLower = todo.title.toLowerCase();
    const queryToLower = filter.query.toLowerCase();

    return titleToLower.includes(queryToLower);
  });

  return (
    <>
      {todos.length ? (
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
            {visibleTodos.map(todo => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered"> </td>

                <td className="is-vcentered is-expanded">
                  <p className={cn({
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
                    onClick={() => handleSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i className={cn('far',
                        {
                          'fa-eye': currentTodo !== todo,
                          'fa-eye-slash': currentTodo === todo,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
