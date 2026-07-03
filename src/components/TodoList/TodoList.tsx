/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';


type Props = {
  handleTodoClick: (todo: Todo) => void;
  isModalOpen: boolean;
};

export const TodoList: React.FC<Props> = ({ handleTodoClick, isModalOpen }) => {
  const todos = useAppSelector(state => state.todos)
  const { query, status } = useAppSelector(state => state.filter);
  const visibleTodos = todos.filter(todo => {
    const filtredTodosByQuery = todo.title.toLowerCase().includes(query.toLowerCase())
    const filtredTodosByStatus =
    status === 'all' ||
    (status === 'active' && !todo.completed)||
    (status === 'completed' && todo.completed);

    return filtredTodosByQuery && filtredTodosByStatus;
  });




  return (
    <>
      {visibleTodos.length === 0 && (
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
         {visibleTodos.map(todo => {
          return (
            <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={todo.completed ? "has-text-success" : "has-text-danger"}>{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleTodoClick(todo)}
              >
                <span className="icon">
                  <i className={classNames('far' ,
                    isModalOpen ? 'fa-eye-slash' : 'fa-eye'
                  )} />
                </span>
              </button>
            </td>
          </tr>
          )
         })}
        </tbody>
      </table>
    </>
  );
};
