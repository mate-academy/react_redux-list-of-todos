/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actionsTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const filter = useAppSelector((state) => state.filter);

  const filteredTodos = todos.filter((todo) => {
    switch (filter.status) {
      case 'all':
        return todo.title.toLowerCase().includes(filter.query.toLowerCase());
      case 'active':
        return (
          todo.completed === false
          && todo.title.toLowerCase().includes(filter.query.toLowerCase())
        );
      case 'completed':
        return (
          todo.completed === true
          && todo.title.toLowerCase().includes(filter.query.toLowerCase())
        );

      default:
        return todo;
    }
  });

  const openTodo = (currentTodo: Todo) => {
    dispatch(actionsTodo.setTodo(currentTodo));
    localStorage.setItem('currentTodo', JSON.stringify(currentTodo));
  };

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
            {filteredTodos?.map((todo) => (
              <tr data-cy="todo" key={todo.id}>
                {todo.completed ? (
                  <>
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                    <td className="is-vcentered is-expanded">
                      <p className="has-text-success">{todo.title}</p>
                    </td>
                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => openTodo(todo)}
                      >
                        <span className="icon">
                          <i className="far fa-eye" />
                        </span>
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered"> </td>
                    <td className="is-vcentered is-expanded">
                      <p className="has-text-danger">{todo.title}</p>
                    </td>
                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => openTodo(todo)}
                      >
                        <span className="icon">
                          <i className="far fa-eye" />
                        </span>
                      </button>
                    </td>
                  </>
                )}
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
});
