/* eslint-disable max-len */
import React, { useEffect } from 'react';
import cn from 'classnames';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todosActions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';
import filterTodos from '../../utils/filterTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, loading } = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector((state) => state.filter);
  const { modalDisplay, currentTodo } = useAppSelector((state) => state.currentTodo);
  const todosToDisplay = filterTodos(query, status, todos);

  const getTodosFromServer = async () => {
    try {
      dispatch(todosActions.setLoading(true));
      const todosFromServer = await getTodos();

      dispatch(todosActions.set(todosFromServer));
    } catch (error) {
      dispatch(todosActions.setError(String(error)));
    } finally {
      dispatch(todosActions.setLoading(false));
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, [getTodosFromServer]);

  const handleModal = (todo: Todo) => {
    dispatch(currentTodoActions.setCurrenTodo(todo));
    dispatch(currentTodoActions.showModal(true));
  };

  return (
    <>
      {todosToDisplay.length !== 0 ? (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon" aria-label="Todo completed">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {todosToDisplay.map((todo: Todo) => (
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
                    className={cn({
                      'has-text-danger': todo.completed,
                      'has-text-success': !todo.completed,
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
                    onClick={() => handleModal(todo)}
                  >
                    <span className="icon">
                      {modalDisplay && todo.id === currentTodo?.id
                        ? <i className="far fa-eye-slash" />
                        : <i className="far fa-eye" />}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
      )}
    </>
  );
};
