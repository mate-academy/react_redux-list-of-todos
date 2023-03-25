/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import { getTodos } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/todos';
import { actions as selectTtodo } from '../../features/currentTodo';
import { getFilteredTodos } from '../../tools/getFilteredTodos';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const getTodosFromServer = async () => {
      const response = await getTodos();

      dispatch(actions.getTodos(response));
    };

    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, query, status);
  }, [todos, status, query]);

  const selectTodo = (todo: Todo) => {
    return dispatch(selectTtodo.setTodo(todo));
  };

  return (
    <>
      {(!visibleTodos.length && query) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {!!todos.length && visibleTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed
                  ? (
                    <span
                      className="icon"
                      data-cy="iconCompleted"
                    >
                      <i className="fas fa-check" />
                    </span>
                  )
                  : ''}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${selectedTodo
                        ? 'fa-eye-slash'
                        : 'fa-eye'}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
