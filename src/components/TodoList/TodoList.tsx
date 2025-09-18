/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const handleSelectTodo = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  const getFilteredTodos = (
    todos: Todo[],
    { query, status }: { query: string; status: string },
  ) => {
    const normalizedQuery = query.toLowerCase();

    return todos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();

      const matchesQuery = normalizedTitle.includes(normalizedQuery);

      if (status === 'all') {
        return matchesQuery;
      }

      if (status === 'active') {
        return matchesQuery && !todo.completed;
      }

      if (status === 'completed') {
        return matchesQuery && todo.completed;
      }
      return false;
    });
  };

  const filteredTodos = getFilteredTodos(todos, { query, status });

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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}{' '}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={` ${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
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
                      <i
                        className={`far fa-eye${currentTodo === todo ? '-slash' : ''}`}
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
