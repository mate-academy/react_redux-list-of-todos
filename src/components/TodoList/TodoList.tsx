/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hook';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
  selectedTodo: Todo | undefined;
};

export const TodoList: React.FC<Props> = ({
  setSelectedTodo,
  selectedTodo,
}) => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const [filterError, setFilterError] = useState(false);

  const getFilteredTodos = () => {
    let result = [...todos];

    if (filter.query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(filter.query.toLowerCase()),
      );
    }

    switch (filter.status) {
      case 'active':
        result = result.filter(todo => !todo.completed);
        break;
      case 'completed':
        result = result.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return result;
  };

  const filteredTodos = getFilteredTodos();

  useEffect(() => {
    if (filteredTodos.length === 0) {
      setFilterError(true);
    } else {
      setFilterError(false);
    }
  }, [filteredTodos]);

  return (
    <>
      {filterError && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {!filterError && (
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
              <tr data-cy="todo" key={todo.id}>
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
                    className={classNames(
                      todo.completed ? 'has-text-success' : 'has-text-danger',
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
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          selectedTodo?.id === todo.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye',
                        )}
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
  );
};
