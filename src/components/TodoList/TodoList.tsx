import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTodos } from '../../api';
import { RootState } from '../../app/store';
import { actions as todosActions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const filter = useSelector<RootState, string>(state => state.filter.status);
  const query = useSelector<RootState, string>(state => state.filter.query);
  const todos = useSelector<RootState, Todo[]>(state => state.todos);
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodo,
  );

  const showTodo = (todoData: Todo) => {
    dispatch(currentTodoActions.setTodo(todoData));
  };

  const getTodosFromServer = async () => {
    setIsLoading(true);

    try {
      const todosDownload: Todo[] = await getTodos();

      dispatch(todosActions.addTodos(todosDownload));
    } finally {
      setIsLoading(false);
    }
  };

  const validateTodo = (title: string, completed: boolean) => {
    const eliminatedTodo = !title.includes(query)
      || (filter === 'active' && completed)
      || (filter === 'completed' && !completed);

    if (eliminatedTodo) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      {(todos.length > 0 && !todos.length) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todos.length > 0 && todos.length > 0 && (
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
            {todos.length > 0 && todos.map(todo => {
              const {
                id,
                title,
                completed,
              } = todo;

              if (!validateTodo(title, completed)) {
                return <Fragment key={id} />;
              }

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={completed
                      ? 'has-text-success'
                      : 'has-text-danger'}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => showTodo(todo)}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          { 'fa-eye-slash': currentTodo?.id === id },
                          { 'fa-eye': currentTodo?.id !== id },
                        )}
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
