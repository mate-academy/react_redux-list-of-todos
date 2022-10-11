/* eslint-disable max-len */
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const changeCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const visibleTodos = useMemo(() => {
    let newTodos = todos.filter(todo => {
      switch (status) {
        case 'active':
          return todo.completed;
        case 'completed':
          return !todo.completed;
        default:
          return todo;
      }
    });

    if (query) {
      newTodos = newTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return newTodos;
  }, [todos, query, status]);

  if (!todos) {
    return null;
  }

  if (!visibleTodos.length && query) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>

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
            <tr
              data-cy="todo"
              key={todo.id}
              className={todo.id === currentTodo?.id ? 'has-background-info-light' : ''}
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
                  className={todo.completed
                    ? 'has-text-success' : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                {todo.id === currentTodo?.id ? (
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => changeCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
