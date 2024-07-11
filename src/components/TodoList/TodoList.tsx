/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api';
import { todosSlice } from '../../features/todos';
import cn from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
import React from 'react';

function filterTodos(todos: any, query: string, status: string) {
  let filteredTodos = todos;
  if (query) {
    filteredTodos = todos.filter((todo: any) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }
  if (status !== 'all') {
    filteredTodos = filteredTodos.filter(
      (todo: any) => todo.completed === (status === 'completed'),
    );
  }
  return filteredTodos;
}

export const TodoList: React.FC = () => {
  const { fetchTodos } = todosSlice.actions;
  const { setCurrentTodo } = currentTodoSlice.actions;
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todosReducer);
  const currentTodo = useSelector((state: any) => state.currentTodoReducer);
  const { query, status } = useSelector((state: any) => state.filterReducer);
  let visibleTodos = filterTodos(todos, query, status);

  useEffect(() => {
    getTodos().then(resp => {
      dispatch(fetchTodos(resp));
    });
  }, []);

  const handleSetCurrentTodo = (todo: any) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!visibleTodos.length && (
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
            {visibleTodos.map((todo: any) => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={cn({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
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
                    className={cn('has-text-success', {
                      'has-text-danger': !todo.completed,
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
                    onClick={() => handleSetCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          currentTodo?.id !== todo.id
                            ? 'far fa-eye'
                            : 'far fa-eye-slash'
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
