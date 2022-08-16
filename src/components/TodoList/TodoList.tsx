import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, selectedTodo }) => {
  const [userId, setUserId] = useState(0);

  const onSelectTodo = (selectedUserId: number) => {
    setUserId(selectedUserId);
  };

  return (
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
          <>
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames(
                { 'has-background-info-light': selectedTodo?.id === todo.id },
              )}
            >
              <td className="is-vcentered">{todo.userId}</td>
              {todo.completed
                ? (
                  <td className="is-vcentered">
                    <i className="fas fa-check" />
                  </td>
                )
                : (
                  <td className="is-vcentered" />
                )}
              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  { 'has-text-danger': !todo.completed },
                  { 'has-text-success': todo.completed },
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
                  onClick={() => onSelectTodo(todo.userId)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far fa-eye',
                      { 'fa-eye-slash': todo === selectedTodo },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          </>
        ))}

        {selectedTodo && (
          <TodoModal
            todo={selectedTodo}
            userId={userId}
          />
        )}
      </tbody>
    </table>
  );
};
