import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [todosToShow, setTodosToShow] = useState<Todo[]>(
    useAppSelector(state => state.todos),
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filtered = todos.filter(todo => {
      if (status === 'active' && todo.completed) {
        return false;
      }

      if (status === 'completed' && !todo.completed) {
        return false;
      }

      return true;
    });
    const queried = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    setTodosToShow(queried);
  }, [status, query, todos]);

  return (
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
        {todosToShow.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
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
                  dispatch(currentTodoSlice.actions.setCurrentTodo(todo))
                }
              >
                <span className="icon">
                  <i
                    className={
                      todo.id === currentTodo?.id
                        ? 'far fa-eye-slash'
                        : 'far fa-eye'
                    }
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
