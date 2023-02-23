import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todoList = useAppSelector(state => state.todos);
  const openedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const set = (value: Todo) => dispatch(actions.setTodo(value));

  const filterTodos = () => {
    switch (filter.status) {
      case 'active':
        return todoList.filter(todo => !todo.completed
          && todo.title.toLowerCase()
            .includes(filter.query.toLowerCase()));

      case 'completed':
        return todoList.filter(todo => todo.completed
          && todo.title.toLowerCase()
            .includes(filter.query.toLowerCase()));

      case 'all':
        return todoList.filter(todo => todo.title.toLowerCase()
          .includes(filter.query.toLowerCase()));

      default:
        return todoList.filter(todo => todo.title.toLowerCase()
          .includes(filter.query.toLowerCase()));
    }
  };

  const filteredTodos
  = useMemo(filterTodos, [filter, todoList]);

  return (
    filteredTodos.length === 0
      ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )
      : (
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
            {filteredTodos.map((todo: Todo) => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames(
                  {
                    'has-background-info-light':
                      openedTodo && openedTodo.id === todo.id,
                  },
                )}
              >
                <>
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {
                      todo.completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )
                    }
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames(
                        {
                          'has-text-success': todo.completed,
                          'has-text-danger': !todo.completed,
                        },
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
                      onClick={() => set(todo)}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          {
                            'fa-eye-slash': openedTodo
                              && openedTodo.id === todo.id,
                            'fa-eye': !openedTodo || openedTodo.id !== todo.id,
                          },
                        )}
                        />
                      </span>
                    </button>
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
      )
  );
};
