/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';



export const TodoList: React.FC = () => {
  const fetchedTodos = useAppSelector(store => store.todos);
  const currentTodo = useAppSelector(store => store.currentTodo);

  const dispatch = useAppDispatch();
  const openedTodo = (id: number) => {
    dispatch(setCurrentTodo(fetchedTodos.find(todo => todo.id === id)));
  };

  return (
    <>
      {!!fetchedTodos.length && <table className="table is-narrow is-fullwidth">
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
          {fetchedTodos.map(todo => (
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
                  className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => openedTodo(todo.id)}
                >
                  <span className="icon">
                    <i className={`far fa-eye${currentTodo ? '-slash' : ''}`} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </>
  );
};
