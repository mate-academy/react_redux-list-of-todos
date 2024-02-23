/* eslint-disable max-len, jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(store => store.todos);
  const filter = useAppSelector(store => store.filter);
  const currentTodo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>(todos);

  React.useEffect(() => {
    let filterTodos: Todo[] = [];

    switch (filter.status) {
      case 'active':
        filterTodos = todos.filter((todo: Todo) => !todo.completed);
        break;

      case 'completed':
        filterTodos = todos.filter((todo: Todo) => todo.completed);
        break;

      case 'all':
      default:
        filterTodos = todos;
        break;
    }

    setFilteredTodos(filterTodos.filter(todo => todo.title.trim().toLowerCase()
      .includes(filter.query.trim().toLowerCase())));
  }, [todos, filter]);

  const handleSelectButtonClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {filteredTodos.length
        ? (
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
              {filteredTodos.map(todoItem => {
                const { id, title, completed } = todoItem;

                return (
                  <tr
                    data-cy="todo"
                    key={id}
                    className={classNames({
                      'has-background-info-light': currentTodo?.id === id,
                    })}
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
                        onClick={() => handleSelectButtonClick(todoItem)}
                      >
                        <span className="icon">
                          <i className={classNames('far',
                            {
                              'fa-eye': currentTodo?.id !== id,
                              'fa-eye-slash': currentTodo?.id === id,
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
        )
        : (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
    </>
  );
};
