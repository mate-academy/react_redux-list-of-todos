import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { NoMatches } from '../NoMatches';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todosList = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector((state) => state.filter);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const [currentTodosList, setCurrentTodosList] = useState(todosList);

  const handleTodosFilter = () => {
    const statusFilteredList = todosList.filter((todo) => {
      switch (status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    });

    const newTodosList = statusFilteredList
      .filter((todo) => todo.title.toLowerCase().includes(query));

    setCurrentTodosList(newTodosList);
  };

  const handleShowModal = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  useEffect(() => {
    handleTodosFilter();
  }, [query, status]);

  return (
    <>
      {!currentTodosList.length ? (
        <NoMatches />
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
            {currentTodosList.map((todo) => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : (
                    ' '
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
                    onClick={() => handleShowModal(todo)}
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
      )}
    </>
  );
};
