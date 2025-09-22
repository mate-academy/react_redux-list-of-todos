/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
  onSelectTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ todos, onSelectTodo }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);

    if (todos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }
  return (
    <>

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
            <tr
              data-cy="todo"
              key={todo.id}
              className={
                currentTodo?.id === todo.id ? 'has-background-info-light' : ''
              }
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className={`is-vcentered is-expanded`}>
                <p
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        currentTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />
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
