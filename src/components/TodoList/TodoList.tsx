import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { Todo } from '../../types/Todo';
import { actions as actionsCurrent } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const todos = useAppSelector(state => state.todos);

  const filterTodos = useMemo(() => {
    let newTodos = [...todos];

    newTodos = newTodos.filter((todo) => {
      switch (status) {
        case 'active':
          return todo.completed;

        case 'completed':
          return !todo.completed;

        default:
          return true;
      }
    });

    newTodos = newTodos.filter((todo) => (
      todo.title.trim().toLowerCase().includes(query.trim().toLowerCase())));

    return newTodos;
  }, [query, todos, status]);

  const selectedTodo = (todo: Todo) => {
    dispatch(actionsCurrent.setTodo(todo));
  };

  return (
    <>
      {
        !filterTodos.length ? (
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
              {
                filterTodos.map((todo: Todo) => (
                  <tr
                    data-cy="todo"
                    className=""
                    key={todo.id}
                  >
                    <td className="is-vcentered">
                      {todo.id}
                    </td>
                    <td className="is-vcentered">
                      {
                        todo.completed && (
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        )
                      }

                    </td>
                    <td className="is-vcentered is-expanded">
                      <p
                        className={
                          todo.completed
                            ? 'has-text-success'
                            : 'has-text-danger'
                        }
                      >
                        {todo.title}
                      </p>
                    </td>
                    <td className="has-text-right is-vcentered">
                      {todo.id === currentTodo?.id
                        ? (
                          <button
                            data-cy="selectButton"
                            className="button"
                            type="button"
                          >
                            <span className="icon">
                              <i className="far fa-eye-slash" />
                            </span>
                          </button>
                        )
                        : (
                          <button
                            data-cy="selectButton"
                            className="button"
                            type="button"
                            onClick={() => {
                              selectedTodo(todo);
                            }}
                          >
                            <span className="icon">
                              <i className="far fa-eye" />
                            </span>
                          </button>
                        )}
                    </td>
                  </tr>
                ))

              }
            </tbody>
          </table>
        )
      }
    </>
  );
};
