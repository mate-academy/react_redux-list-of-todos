/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const { todos, error } = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);

  const filteredTodos = todos
    .filter(todo => {
      if (status === 'active') return !todo.completed;
      if (status === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      if (!query.trim()) return true;
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    });

  const handleOpenModal = (todo: Todo) => {
    dispatch(currentTodoActions.setCurrentTodo(todo));
    dispatch(currentTodoActions.setModalLoading(true));
    dispatch(currentTodoActions.toggleModal(true));
    dispatch(currentTodoActions.setModalLoading(false));

    getUser(todo.userId).then(user => {
      dispatch(currentTodoActions.setCurrentUser(user));
      dispatch(currentTodoActions.setModalLoading(false));
    });
  };

  return (
    <>
      {filteredTodos.length === 0 && (
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
          {filteredTodos.map(todo => (
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  {todo.completed ? <i className="fas fa-check" /> : ''}

                </span>
              </td>

              <td className="is-vcentered is-expanded">
                {todo.completed ? (
                  <p className="has-text-success">
                    {todo.title}
                  </p>) : (
                    <p className="has-text-danger">
                      {todo.title}
                    </p>
                  )
                }
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleOpenModal(todo)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
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
