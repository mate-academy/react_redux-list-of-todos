/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectTodo,
  setLoadingModal,
  setUser,
} from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.items);
  const currentQuery = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo.currentItem);
  const currentStatus = useAppSelector(state => state.filter.status);
  const loading = useAppSelector(state => state.todos.loading);

  const filteredTodos = todos
    .filter(todo =>
      todo.title.toLowerCase().includes(currentQuery.toLowerCase()),
    )
    .filter(todo => {
      if (currentStatus === 'all') return true;
      if (currentStatus === 'active') return !todo.completed;
      if (currentStatus === 'completed') return todo.completed;
      return true; // fallback
    });

  return (
    <>
      {filteredTodos.length === 0 && !loading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  {currentTodo && currentTodo.id === todo.id ? (
                    // Render the HIDE button (fa-eye-slash)
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        dispatch(selectTodo(null)); // or dispatch(clearTodo())
                      }}
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  ) : (
                    // Render the SHOW button (fa-eye)
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        dispatch(selectTodo(todo));
                        dispatch(setUser(null));
                        dispatch(setLoadingModal(true));
                        getUser(todo.userId).then(user => {
                          dispatch(setUser(user));
                          dispatch(setLoadingModal(false));
                        });
                      }}
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
      )}
    </>
  );
};
