/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';

type Props = {
  selectedTodo?: Todo;
  setSelectedTodo: (todo: Todo | undefined) => void;
}

export const TodoList: React.FC<Props> = ({
    selectedTodo,
    setSelectedTodo,
  }) => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const [hasErrorFilter, setHasErrorFilter] = useState(false);

  const getFilteredTodos = () => {
    const { query, status } = filter;
    let filteredTodos = [...todos];

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (status === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (status === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return filteredTodos;
  };

  const filteredTodos = getFilteredTodos();

  useEffect(() => {
    setHasErrorFilter(filteredTodos.length === 0);
  }, [filteredTodos.length]);

  return (
    <>
      {hasErrorFilter ? (
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
                  <p className={classNames(
                      todo.completed ? 'has-text-success' : 'has-text-danger'
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
                      <i className={classNames(
                        selectedTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      )} />
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
