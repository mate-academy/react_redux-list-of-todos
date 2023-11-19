import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { filteringTodos } from '../../app/filter';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filterTodos = useMemo(() => filteringTodos(todos, query, status),
    [query, status, todos]);

  return (
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
            filterTodos.map((todo) => {
              const { id, completed, title } = todo;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={cn({ 'has-background-info-light': currentTodo })}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {
                      completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )
                    }
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={cn(
                      { 'has-text-danger': !completed },
                      { 'has-text-success': completed },
                    )}
                    >
                      {title}
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(actionsCurrentTodo.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={cn(
                          { 'far fa-eye-slash': currentTodo?.id === id },
                          { 'far fa-eye': currentTodo?.id !== id },
                        )}
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
  );
};
