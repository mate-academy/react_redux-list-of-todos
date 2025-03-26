/* eslint-disable */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/Hooks';
import { handleCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo)

  const dispatch = useAppDispatch();

  const { status, query } = filter;

  const preparedTodos = useMemo(
    () => [...todos].filter(todo => {
    switch (status) {
      case 'completed':
        return todo.completed

      case 'active':
        return !todo.completed

      default:
        return todo
    }
  }).filter(todo => {
    const preparedTitle = todo.title.toLocaleLowerCase();
    const preparedQuery = query.toLocaleLowerCase();

    return preparedTitle.includes(preparedQuery);
  }), [status, query])

  return (
    <>
      {!preparedTodos.length ? (
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
            {preparedTodos.map((todo) => {
              const { id, title, completed } = todo;
              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={cn({ 'has-background-info-light': id === currentTodo?.id })}
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
                    <p className={cn({
                      'has-text-danger': !completed,
                      'has-text-success': completed
                    })}>{title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(handleCurrentTodo(todo))}
                    >
                      <span className="icon">
                        {id === currentTodo?.id
                          ? (<i className="far fa-eye-slash" />)
                          : (<i className="far fa-eye" />)
                        }
                      </span>
                    </button>
                  </td>
                </tr>
              )

            })}
          </tbody>
        </table >
      )}
    </>
  );
};
