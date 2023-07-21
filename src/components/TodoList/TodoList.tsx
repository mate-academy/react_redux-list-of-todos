import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TotoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { SelectValue } from '../../types/SelectValues';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const setCurrentTodo = (todo: Todo) => dispatch(TotoActions.setTodo(todo));

  const filterForStatusTodo = () => {
    switch (status) {
      case SelectValue.Completed:
        return todos.filter((todo) => todo.completed);
      case SelectValue.Active:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const todosFilter = (todosFromServer: Todo[], search: string) => {
    const queryLower = search.toLowerCase().trim();

    if (queryLower === '') {
      return todosFromServer;
    }

    return todosFromServer.filter((todo:Todo) => todo.title
      .toLowerCase()
      .includes(queryLower));
  };

  const visibleTodos = useMemo(() => {
    return todosFilter(filterForStatusTodo(), query);
  }, [todos, query, status]);

  return (
    <>
      {query && !visibleTodos.length ? (
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
            {
              visibleTodos.map((todo) => {
                return (
                  <tr
                    key={todo.id}
                    data-cy="todo"
                    className={classNames({
                      'has-background-info-light': currentTodo?.id === todo.id,
                    })}
                  >
                    <td className="is-vcentered">{todo.id}</td>

                    {todo.completed ? (
                      <td className="is-vcentered">
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      </td>
                    ) : (
                      <td className="is-vcentered" />
                    )}
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
                        name="selectButton"
                        onClick={() => setCurrentTodo(todo)}
                        type="button"
                      >
                        <span className="icon">
                          <i className={classNames('far', {
                            'fa-eye-slash': currentTodo?.id === todo.id,
                            'fa-eye': currentTodo?.id !== todo.id,
                          })}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      )}
    </>
  );
};
