import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const visibleTodos = useAppSelector(({ todos, filter }) => {
    return todos.filter(todo => {
      const queryCondition = todo.title
        .toLowerCase()
        .includes(filter.query.toLowerCase());

      switch (filter.status) {
        case 'all':
          return queryCondition;
        case 'active':
          return queryCondition && !todo.completed;
        case 'completed':
          return queryCondition && todo.completed;
        default:
          return true;
      }
    });
  });

  return (
    <>
      {!visibleTodos.length
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
              {visibleTodos.map(todo => {
                const { id, completed, title } = todo;
                const isSelectedTodo = currentTodo?.id === id;

                return (
                  <tr
                    data-cy="todo"
                    key={id}
                    className={classNames(
                      { 'has-background-info-light': isSelectedTodo },
                    )}
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
                      <p className={classNames(
                        completed
                          ? 'has-text-success'
                          : 'has-text-danger',
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
                        onClick={() => {
                          dispatch(currentTodoAction.setTodo(todo));
                        }}
                      >
                        <span className="icon">
                          <i className={classNames(
                            'far',
                            isSelectedTodo ? 'fa-eye-slash' : 'fa-eye',
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
