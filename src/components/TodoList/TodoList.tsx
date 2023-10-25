/* eslint-disable max-len */
import cn from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTododActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector(state => state);
  const { filter } = useAppSelector(state => state);
  const { todos } = useAppSelector(state => state);

  const filterTodos = useMemo(() => {
    let newTodos = [...todos];

    if (filter.query) {
      newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(filter.query));
    }

    switch (filter.status) {
      case 'active':
        return newTodos.filter(todo => !todo.completed);
      case 'completed':
        return newTodos.filter(todo => todo.completed);
      default:
        return newTodos;
    }
  }, [filter]);

  const handleSelectTodo = (todo:Todo) => {
    dispatch(currentTododActions.setTodo(todo));
  };

  return (
    <>
      {
        !filterTodos.length ? (
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
                filterTodos.map(todo => {
                  const {
                    id,
                    title,
                    completed,
                  } = todo;

                  const isCurrentTodo = id === currentTodo?.id;

                  return (
                    <tr
                      key={id}
                      data-cy="todo"
                      className={cn({
                        'has-background-info-light': isCurrentTodo,
                      })}
                    >
                      <td className="is-vcentered">{id}</td>
                      <td className="is-vcentered">
                        {completed && (
                          <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                        )}
                      </td>

                      <td className="is-vcentered is-expanded">
                        <p className={cn({
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
                          onClick={() => handleSelectTodo(todo)}
                        >
                          <span className="icon">
                            <i className={cn('far', {
                              'fa-eye': !isCurrentTodo,
                              'fa-eye-slash': isCurrentTodo,
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
        )
      }
    </>
  );
};
