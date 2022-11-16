import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { GroupBy } from '../../types/GroupBy';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const visibleTodos = useAppSelector(({ filter, todos }) => {
    return todos.filter((todo) => {
      const queryCondition = todo.title.toLowerCase()
        .includes(filter.query.toLocaleLowerCase());

      switch (filter.groupBy) {
        case GroupBy.Active:
          return (!todo.completed && queryCondition);
        case GroupBy.Completed:
          return (todo.completed && queryCondition);

        default:
          return (true && queryCondition);
      }
    });
  });

  return (
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
        {visibleTodos.map((todo) => {
          const { id, title, completed } = todo;

          return (
            <tr
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo === todo,
              })}
              key={id}
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
                    'has-text-danger': !completed,
                    'has-text-success': completed,
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
                  onClick={() => dispatch(actions.setTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        { 'fa-eye': selectedTodo !== todo },
                        { 'fa-eye-slash': selectedTodo === todo },
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
  );
};
