/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useFilter } from '../../app/hooks/useFilter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos)


  const filteredTodos = useFilter(todos);

  return (
    <>
    {filteredTodos && !filteredTodos.length ? (
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
