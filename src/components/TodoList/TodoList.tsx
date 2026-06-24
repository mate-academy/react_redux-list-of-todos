/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { openTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const isLoading = useAppSelector(state => state.loading);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      switch (status) {
        case 'all':
          return true;
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    });

  if (filteredTodos.length === 0 && !isLoading) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    )
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

        {isLoading ? (
          <Loader />
        ) : (
          <tbody>
            {filteredTodos.map((todo: Todo) => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={
                  currentTodo?.id === todo.id ? 'has-background-info-light' : ''
                }
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : (
                    ''
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
                    onClick={() => dispatch(openTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={
                          currentTodo?.id === todo.id
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
        )}
      </table>
    </>
  );
};
