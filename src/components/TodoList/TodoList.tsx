/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type TodoProps = {
  todos: Todo[] | null;
  filter: Status;
  onTodoSelect: (Id: number, todo: Todo) => void;
  searchQuery?: string;
  selectedTodoId?: number | null;
  onTodoDeselect?: () => void;
};

export const TodoList: React.FC<TodoProps> = ({
  todos,
  filter,
  onTodoSelect,
  searchQuery = '',
  selectedTodoId = null,
  onTodoDeselect,
}) => {
  const [localSelectedTodoId, setLocalSelectedTodoId] = useState<number | null>(
    null,
  );

  // Reset local selected state when parent selected state changes
  useEffect(() => {
    if (selectedTodoId === null) {
      setLocalSelectedTodoId(null);
    }
  }, [selectedTodoId]);

  const currentSelectedId = selectedTodoId || localSelectedTodoId;

  let filteredTodos: Todo[] | null = null;

  // First filter by status
  switch (filter) {
    case 'completed':
      filteredTodos = todos?.filter(t => t.completed) || null;
      break;
    case 'active':
      filteredTodos = todos?.filter(t => !t.completed) || null;
      break;
    case 'all':
      filteredTodos = todos;
      break;
    default:
      filteredTodos = todos;
      break;
  }

  // Then filter by search query (case insensitive)
  if (searchQuery && filteredTodos) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  const handleTodoSelectClick = (userId: number, todo: Todo) => {
    setLocalSelectedTodoId(todo.id);
    onTodoSelect(userId, todo);
  };

  const handleTodoDeselect = () => {
    setLocalSelectedTodoId(null);
    if (onTodoDeselect) {
      onTodoDeselect();
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
        {todos !== null
          ? filteredTodos?.map(todo => (
              <tr
                data-cy="todo"
                className="has-background-info-light"
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : null}
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
                  {currentSelectedId === todo.id ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={handleTodoDeselect}
                    >
                      <span className="icon">
                        <i className="fa fa-eye-slash" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => handleTodoSelectClick(todo.userId, todo)}
                    >
                      <span className="icon">
                        <i className="fa fa-eye" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
