/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getTodos } from '../../api';
import { todosSlice } from '../../features/todos';
import { currentTodoSlice } from '../../features/currentTodo';
import { isLoadingSlice } from '../../features/isLoading';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(isLoadingSlice.actions.setIsLoading(true));
    getTodos()
      .then(todos => dispatch(todosSlice.actions.setTodos(todos)))
      .finally(() => dispatch(isLoadingSlice.actions.setIsLoading(false)));
  }, []);

  return (
    <>
      {!todos ? (
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
            {todos.map(todo => (
              <tr data-cy="todo" className="" key={todo.id}>
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
                          todo === currentTodo
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
      )}
    </>
  );
};
