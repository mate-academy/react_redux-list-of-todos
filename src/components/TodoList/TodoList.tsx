/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { setTodos } from '../../features/todos';
import { setTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMassege, setErrorMassege] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector((state) => state.todos);
  const { filterStatus, query } = useAppSelector((state) => state.filter);
  const currentTodo: Todo | null = useAppSelector((state) => state.currentTodo);

  const filteredTodos = () => {
    let newTodos = [...todos];

    switch (filterStatus) {
      case 'active':
        newTodos = newTodos.filter((todo) => !todo.completed);
        break;
      case 'completed':
        newTodos = newTodos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    if (query.trim()) {
      newTodos = newTodos.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return newTodos;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todosData = await getTodos();

        dispatch(setTodos(todosData));
        setLoading(false);
      } catch (error) {
        setErrorMassege(true);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {errorMassege && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon" aria-label="Completed">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th aria-label="btn" />
          </tr>
        </thead>

        <tbody>
          {filteredTodos().map((todo: Todo) => (
            <tr data-cy="todo">
              <td className="is-vcentered">
                {todo.id}
              </td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={cn(
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed },
                  )}
                >
                  <p id={`todo-${todo.id}`}>
                    {todo.title}
                  </p>
                </label>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  aria-label={`View details of todo ${todo.title}`}
                  onClick={() => dispatch(setTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={cn('far',
                        { 'fa-eye': todo !== currentTodo },
                        { 'fa-eye-slash': todo === currentTodo })}
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
