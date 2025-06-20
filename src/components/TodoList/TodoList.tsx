/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const allTodos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const id = useAppSelector(state => state.currentTodo?.id);
  const setCurrentTodo = currentTodoSlice.actions.setCurrentTodo;

  const todos = allTodos.filter(todo => {
    const c1 = todo.title.toLowerCase().includes(query.toLowerCase());
    const c2 = todo.completed;
    switch (status) {
      case 'all':
        return c1;
      case 'active':
        return c1 && !c2;
      case 'completed':
        return c1 && c2;
    }
  });

  return (
    <>
      {todos.length === 0 ? (
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
            {todos.map(todo => {
              return (
                <tr key={todo.id} data-cy="todo" className="">
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
                      className={classNames(
                        'is-vcentered',
                        todo.completed ? 'has-text-success' : 'has-text-danger',
                      )}
                    >
                      {todo.title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        dispatch(setCurrentTodo(todo));
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            todo.id === id ? 'far fa-eye-slash' : 'far fa-eye',
                          )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
