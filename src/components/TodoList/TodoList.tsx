/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  setTodoSelect: (id: number) => void,
  todoSelect: number,
  filteredTodos: Todo[],
}

export const TodoList: React.FC<Props> = ({ setTodoSelect, todoSelect, filteredTodos }) => {
  return (
    <>
      {filteredTodos.length < 0
       && (
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
          {filteredTodos.map((todo) => (
            <tr data-cy="todo" className="" key={todo.id}>
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
                  className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setTodoSelect(todo.id)}
                >
                  <span className="icon">
                    {todoSelect === todo.id
                      ? (<i className="far fa-eye-slash" />)
                      : (<i className="far fa-eye" />)}
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
