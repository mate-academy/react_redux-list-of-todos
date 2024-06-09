import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { actions as todosActions } from '../../features/todos';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { getTodos } from '../../api';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, filter } = useAppSelector(state => state.filter);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todosFromApi: Todo[]) =>
        dispatch(todosActions.setTodos(todosFromApi)),
      )
      .catch(() => {
        alert("Couldn't fetch the todos");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const displayedTodos = useMemo(() => {
    let todosCopy = [...todos];

    switch (filter) {
      case Filter.All:
        break;
      case Filter.Active:
        todosCopy = todosCopy.filter((todo: Todo) => todo.completed === false);
        break;
      case Filter.Completed:
        todosCopy = todosCopy.filter((todo: Todo) => todo.completed === true);
        break;
      default:
        break;
    }

    todosCopy = todosCopy.filter((todo: Todo) =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );

    return todosCopy;
  }, [filter, query, todos]);

  if (isLoading) {
    return <Loader />;
  }

  if (!displayedTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  const handleSetCurrentTodo = (todo: Todo) =>
    dispatch(currentTodoActions.setTodo(todo));

  return (
    <>
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
          {displayedTodos.map((todo: Todo) => (
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
                  onClick={() => handleSetCurrentTodo(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        {
                          'fa-eye': currentTodo?.id !== todo.id,
                        },
                        {
                          'fa-eye-slash': currentTodo?.id === todo.id,
                        },
                      )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
