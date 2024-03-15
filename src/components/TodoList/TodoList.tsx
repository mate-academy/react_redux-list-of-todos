/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';


export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  console.log(todos)

  useEffect(() => { 
  
  }, [todos]);
  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
              <td className="is-vcentered">{todo.completed}</td>

              <td className="is-vcentered is-expanded">
                <p className="has-text-danger">{todo.title}</p>
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
    </>
  );
};
