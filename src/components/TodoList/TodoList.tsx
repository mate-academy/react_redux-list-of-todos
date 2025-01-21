import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  visible: boolean;
  onTodoSelect: (todo: Todo) => void;
  onModalToggle: (toggled: boolean) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  visible,
  onTodoSelect,
  onModalToggle,
}) => {
  const handleView = (id: number) => {
    const newTodo = todos.find(todo => todo.id === id);

    if (newTodo) {
      onTodoSelect(newTodo);
      onModalToggle(true);
    }
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
        {todos.map(todo => {
          const { id, title, completed } = todo;

          return (
            <tr data-cy="todo" className="" key={id}>
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
                    'has-text-danger': !completed,
                    'has-text-success': completed,
                  })}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleView(id)}
                >
                  <span className="icon">
                    <i
                      className={classNames({
                        'far fa-eye': !visible,
                        'far fa-eye-slash': visible,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
