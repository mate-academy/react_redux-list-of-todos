import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

type TodoListProps = {
  todos: Todo[];
  currentTodo: Todo | null;
};

const getFilteredTodos = (query: string, status: Status, todos: Todo[]) => {
  const trimQuery = query.trim();
  let filteredTodos = todos;

  if (trimQuery) {
    // eslint-disable-next-line max-len
    filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(trimQuery.toLowerCase()));
  }

  switch (status) {
    case 'active':
      return filteredTodos.filter((todo) => !todo.completed);
    case 'completed':
      return filteredTodos.filter((todo) => todo.completed);
    default:
      return filteredTodos;
  }
};

export const TodoList: React.FC<TodoListProps> = ({ todos, currentTodo }) => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.filter);

  const filteredTodos = useMemo(
    () => getFilteredTodos(query, status, todos),
    [todos, query, status],
  );

  return (
    <>
      {filteredTodos.length > 0 ? (
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
            {filteredTodos.map((todo) => (
              <tr data-cy="todo" key={todo.id}>
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
                    onClick={() => dispatch(actions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={`far ${
                          todo.id === currentTodo?.id
                            ? 'fa-eye-slash'
                            : 'fa-eye'
                        }`}
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
