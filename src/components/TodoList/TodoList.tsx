/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(currTodo => (
      currTodo.title.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (status) {
    visibleTodos = visibleTodos.filter((todo) => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return visibleTodos;
      }
    });
  }

  return (
    <>
      {
        !visibleTodos.length
          ? (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )
          : (
            <table className="table is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th>#</th>

                  <th aria-label="completed status">
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                  </th>

                  <th>Title</th>
                  <th>{' '}</th>
                </tr>
              </thead>

              <tbody>
                {visibleTodos.map((todo: Todo) => (
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
                        className={todo.completed
                          ? 'has-text-success'
                          : 'has-text-danger'}
                      >
                        {todo.title}
                      </p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        aria-label="show details"
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                      >
                        <span className="icon">
                          <i
                            className={
                              `far ${todo.id === currentTodo?.id
                                ? 'fa-eye-slash'
                                : 'fa-eye'}`
                            }
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }
    </>
  );
};
