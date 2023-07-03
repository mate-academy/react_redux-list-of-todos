/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const { query, status } = useAppSelector(state => state.filter);
  const { loading } = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  let todoStatus: boolean | null = null;

  const filteredTodos = todos.filter(todo => {
    const formattedTitle = todo.title.toLowerCase();
    const formattedQuery = query.toLowerCase();

    switch (status) {
      case 'completed':
        todoStatus = true;
        break;
      case 'active':
        todoStatus = false;
        break;
      default:
        todoStatus = null;
    }

    return formattedTitle.includes(formattedQuery)
      && (todo.completed === todoStatus || status === 'all');
  });

  return (
    <>
      {loading || filteredTodos.length ? (
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
              <tr
                data-cy="todo"
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn(
                      { 'has-text-success': todo.completed },
                      { 'has-text-danger': !todo.completed },
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
                    onClick={() => dispatch(actions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={cn(
                        { 'far fa-eye': !currentTodo },
                        { 'far fa-eye-slash': currentTodo },
                      )}
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
