import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
  onModalButtonClick: (todo: Todo) => void;
  isModalButtonClicked: boolean,
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  onModalButtonClick,
  isModalButtonClicked,
}) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const onClick = (todo: Todo) => {
    setSelectedTodoId(todo.id);
    onModalButtonClick(todo);
  };

  const checkIfModalButonClicked = (todoId: number) => {
    return isModalButtonClicked && todoId === selectedTodoId;
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
        {visibleTodos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': checkIfModalButonClicked(todo.id),
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed ? (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              ) : ''}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => onClick(todo)}
              >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': !checkIfModalButonClicked(todo.id),
                    'fa-eye-slash': checkIfModalButonClicked(todo.id),
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
