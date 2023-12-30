/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../features/filter';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos: Todo[] = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos: Todo[] = useMemo(() => {
    const filteredByQuery = todos
      .filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase().trim()));

    switch (filter.status) {
      case Status.Active:
        return filteredByQuery.filter(todo => !todo.completed);

      case Status.Completed:
        return filteredByQuery.filter(todo => todo.completed);

      default:
        return filteredByQuery;
    }
  }, [todos, filter]);

  const showModal = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!filteredTodos.length
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
              {filteredTodos.map(todo => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={cn({
                    'has-background-info-light': todo.id === selectedTodo?.id,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
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
                      onClick={() => showModal(todo)}
                    >
                      <span className="icon">
                        <i className={cn('far', {
                          'fa-eye': todo.id !== selectedTodo?.id,
                          'fa-eye-slash': todo.id === selectedTodo?.id,
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
