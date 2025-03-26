import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import cn from 'classnames';

interface TodoListProps {
  status: Status;
  search: string;
  setSelectedTodo: (todo: Todo | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  selectedTodo: Todo | null;
  todos: Todo[];
  openModal: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  status,
  search,
  isModalOpen,
  selectedTodo,
  todos,
  openModal,
}) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    let filtered = todos;

    if (status !== 'all') {
      filtered = filtered.filter(todo =>
        status === 'active' ? !todo.completed : todo.completed,
      );
    }

    if (search) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredTodos(filtered);
  }, [todos, status, search]);

  return (
    <>
      <>
        {filteredTodos.length === 0 && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}

        {filteredTodos.length > 0 && (
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
                <tr
                  className={cn({
                    'has-background-info-light':
                      todo.id === selectedTodo?.id && isModalOpen,
                  })}
                  key={todo.id}
                  data-cy="todo"
                >
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
                      className={cn({
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
                      })}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      className="button"
                      data-cy="selectButton"
                      type="button"
                      onClick={() => openModal(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye':
                              todo.id !== selectedTodo?.id || !isModalOpen,
                            'fa-eye-slash':
                              todo.id === selectedTodo?.id && isModalOpen,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </>
  );
};
