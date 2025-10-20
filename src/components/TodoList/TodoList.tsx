/* eslint-disable */
import React, { useMemo } from 'react';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    let list = todos;

    if (status === 'active') {
      list = todos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      list = todos.filter(todo => todo.completed);
    }

    if (query.length > 0) {
      list = list.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return list;
  }, [todos, status, query]);

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
            {filteredTodos.map(todo => (
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
                    onClick={() =>
                      currentTodo?.id === todo.id
                        ? dispatch(currentTodoSlice.actions.clearCurrentTodo())
                        : dispatch(
                            currentTodoSlice.actions.setCurrentTodo(todo),
                          )
                    }
                  >
                    <span className="icon">
                      <i
                        className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
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
