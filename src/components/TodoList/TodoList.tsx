/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>();

  const dispatch = useDispatch();
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filterTodos = () => {
    return todos.filter(({ title, completed }) => {
      const filterByQuery = title
        .toLowerCase()
        .includes(filter.query.toLowerCase());

      switch (filter.status) {
        case Status.ALL:
          return filterByQuery;

        case Status.ACTIVE:
          return !completed && filterByQuery;

        case Status.COMPLETED:
          return completed && filterByQuery;

        default:
          return filterByQuery;
      }
    });
  };

  const handleTodoSelect = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  useEffect(() => {
    setFilteredTodos(filterTodos());
  }, [filter]);

  return (
    <>
      {filteredTodos && filteredTodos.length ? (
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
            {filteredTodos.map(({ id, completed, title }) => {
              const todo = { id, completed, title }; // Create a new object with destructured properties

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': currentTodo?.id === id,
                  })}
                  key={id}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames({
                        'has-text-success': completed,
                        'has-text-danger': !completed,
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
                      onClick={() => handleTodoSelect(todo as Todo)} // Use the destructured todo object
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': id !== currentTodo?.id,
                            'fa-eye-slash': id === currentTodo?.id,
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
