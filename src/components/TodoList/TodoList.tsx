/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[] | null,
  currentTodo: Todo | null,
  setTodo: (todo: Todo) => void,
}

export const TodoList: React.FC<Props> = ({ todos, currentTodo, setTodo }) => {

  return (
    <>
      {!todos || todos.length === 0 ? (
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
          {todos?.map(todo => (
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
                <p className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button data-cy="selectButton" className="button" type="button" onClick={() => setTodo(todo)}>
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye': currentTodo !== todo,
                      'fa-eye-slash': currentTodo == todo,
                    })} />
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
