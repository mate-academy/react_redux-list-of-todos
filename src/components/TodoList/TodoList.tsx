/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const selecredTodo = useAppSelector(state => state.currentTodo);
  const allFilters = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const [todosToShow, setTodostoShow] = useState([...todos]);

  // eslint-disable-next-line no-console
  console.log('allFilters', allFilters);

  useEffect(() => {
    switch (allFilters.status) {
      case Status.ALL:
        setTodostoShow([...todos]);
        break;
      case Status.ACTIVE:
        setTodostoShow(todos.filter(todo => todo.completed === false));
        break;
      case Status.COMPLETED:
        setTodostoShow(todos.filter(todo => todo.completed === true));
        break;
      default:
        setTodostoShow(todos);
    }

    if (allFilters.query) {
      setTodostoShow(todos.filter(todo => todo.title.toLowerCase().includes(allFilters.query.toLowerCase())));
    }
  }, [todos, allFilters.status, allFilters.query]);

  return (
    <>
      {!todosToShow.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {todosToShow.map(todo => {
            const isSelectedTodo = selecredTodo?.id === todo.id;

            return (
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
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
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
                    onClick={() => ('Hello world')}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye-slash': isSelectedTodo,
                        'fa-eye': !isSelectedTodo,
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
    </>
  );
};
