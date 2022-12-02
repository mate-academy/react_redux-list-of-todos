/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state) => state.todos);
  const selectedTodo = useAppSelector((state => state.currentTodo));
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const filterBySearch = (todoTitle: string, queryText: string) => {
    return todoTitle.toLowerCase().includes(queryText.toLowerCase());
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed, title }) => {
      switch (status) {
        case 'active':
          return !completed && filterBySearch(title, query);
        case 'completed':
          return completed && filterBySearch(title, query);
        case 'all':
        default:
          return filterBySearch(title, query);
      }
    });
  }, [todos, status, query]);

  const showModal = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
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
            {/* как вообще работает мап если  todos это объект */}
            {/* todos то ключ и в нем массив а переменная с именем todos уже имеет массив который вытащили по ключю todos из стейта */}
            {filteredTodos.map((todo: Todo) => {
              const { id, title, completed } = todo;

              return (
                <tr key={id} data-cy="todo">
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
                      onClick={() => showModal(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': selectedTodo?.id === id,
                            'fa-eye': selectedTodo?.id !== id,
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
      )}
    </>
  );
};
