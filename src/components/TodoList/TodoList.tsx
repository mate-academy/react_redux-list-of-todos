/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { actions as todosActions } from '../../features/todos';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const selectedTodo = todos.find(todo => currentTodo?.id === todo.id);

  const handleOpenModal = (newTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(newTodo));
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(response => dispatch(todosActions.set(response)))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  const filter = useAppSelector(state => state.filter);
  const { status, query } = filter;

  const filteredTodos = useMemo(() => {
    let preparedTodos = [...todos];

    preparedTodos = preparedTodos.filter(todo => {
      switch (status) {
        case 'all':
          return preparedTodos;
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return preparedTodos;
      }
    });

    if (query) {
      preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return preparedTodos;
  }, [todos, status, query]);

  return (
    <>
      {!filteredTodos.length && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {isLoading && <Loader />}

      {filteredTodos.length > 0 && !isLoading && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th aria-label="title">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th aria-label="title" />
            </tr>
          </thead>

          <tbody>
            {filteredTodos.length && filteredTodos.map((todo) => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={cn({ 'has-background-info-light': selectedTodo?.id === todo.id })}
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
                    className={todo.completed
                      ? 'has-text-success' : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>

                <td aria-label="title" className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleOpenModal(todo)}
                  >
                    <span className="icon">
                      <i className={cn('far', {
                        'fa-eye': selectedTodo?.id !== todo.id,
                        'fa-eye-slash': selectedTodo?.id === todo.id,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
