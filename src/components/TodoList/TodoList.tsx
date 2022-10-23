/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { actions as todosActions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Filter = {
  status?: Status,
  query?: string,
};

type Props = {
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
};

export const TodoList: React.FC<Props> = ({ isLoading, setIsLoading }) => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const filter: Filter = useAppSelector(state => state.filter);
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const visibleTodos = todos.filter(todo => {
    if (filter && filter.query) {
      return todo.title.toLowerCase().match(filter.query.toLowerCase());
    }

    return todo;
  }).filter(todo => {
    if (filter && filter.status) {
      switch (filter.status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default: return todo;
      }
    }

    return todo;
  });

  const setCurrentTodo = (newCurrentTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(newCurrentTodo));
  };

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((response) => {
        dispatch(todosActions.setTodos(response));
      })
      .catch(() => {
        throw new Error('Error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {!isLoading && visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isLoading && visibleTodos.length > 0 && (
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
            {visibleTodos.map(todo => {
              return (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': todo.id === currentTodo?.id,
                  })}
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
                      className={classNames({
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
                      onClick={() => setCurrentTodo(todo)}
                    >
                      <span className="icon">
                        { todo.id !== currentTodo?.id
                          ? (
                            <i className="far fa-eye" />
                          ) : (
                            <i className="far fa-eye-slash" />
                          )}
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
