import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => todo.title
        .toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      .filter(todo => {
        switch (status) {
          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;

          default:
            return true;
        }
      })
  ), [status, todos, query]);

  return (
    <>
      {filteredTodos
        ? (
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
              {filteredTodos.map(todo => {
                const { id, title, completed } = todo;

                return (
                  <tr
                    data-cy="todo"
                    key={id}
                    className={classNames({
                      'has-background-info-light': todo.id === currentTodo?.id,
                    })}
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
                      <p
                        className={classNames({
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
                        onClick={() => {
                          if (currentTodo?.id === todo.id) {
                            dispatch(currTodoActions.removeTodo());
                          } else {
                            dispatch(currTodoActions.setTodo(todo));
                          }
                        }}
                      >
                        <span className="icon">
                          <i className={classNames(
                            'far',
                            { 'fa-eye': id !== currentTodo?.id },
                            { 'fa-eye-slash': id === currentTodo?.id },
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
        )
        : (<p>No data received</p>)}
    </>
  );
};
