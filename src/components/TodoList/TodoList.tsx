/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos)

  return (
    <>
    {todos && !todos.length ? (
      <p className="notification is-warning" onClick={() => console.log(todos)}>
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
          {todos.map(todo => (
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
                  <p className="has-text-danger">{todo.title}xxx</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button">
                    <span className="icon">
                      <i className="far fa-eye" />
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
