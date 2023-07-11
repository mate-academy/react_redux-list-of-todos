import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleClick = async (todo: Todo) => {
    dispatch(currentActions.setTodo(todo));
  };

  // eslint-disable-next-line no-console
  console.log(Boolean(currentTodo));

  const newTodos = todos.filter(({ completed }) => {
    switch (status) {
      case 'active':
        return !completed;

      case 'completed':
        return completed;

      case 'all':
        return true;

      default:
        return false;
    }
  }).filter((todo) => {
    if (!query) {
      return todo;
    }

    const lowerQuery = query.toLowerCase().trim();
    const lowerTitle = todo.title.toLowerCase();

    return lowerTitle.includes(lowerQuery);
  });

  return (
    <>
      {newTodos.length === 0 ? (
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
            {newTodos.map(({
              id,
              title,
              completed,
              userId,
            }) => (
              <tr
                data-cy="todo"
                className={cn(
                  { 'has-backgound-info-light': currentTodo?.id === id },
                )}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {
                    completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )
                  }
                </td>

                <td className="is-vcentered is-expanded">

                  <p className={cn(
                    { 'has-text-danger': !completed },
                    { 'has-text-success': completed },
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
                    onClick={() => handleClick({
                      id,
                      title,
                      completed,
                      userId,
                    })}
                  >
                    <span className="icon">
                      <i className={cn(
                        'far',
                        { 'fa-eye': currentTodo?.id !== id },
                        { 'fa-eye-slash': currentTodo?.id === id },
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
