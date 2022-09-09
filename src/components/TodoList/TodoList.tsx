/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actionsWithTodoID } from '../../features/currentTodoID';
import { FilterMethods } from '../../features/filter';

export const TodoList: React.FC = () => {
  const todosToShow = useAppSelector(state => {
    const { todos } = state;
    const { query, status } = state.filter;

    const todosToReturn = todos.filter(todo => {
      const isIncludeQuery = todo.title.toLowerCase().includes(query.toLowerCase().trim());

      switch (status) {
        case FilterMethods.COMPLETED:
          return !todo.completed && isIncludeQuery;

        case FilterMethods.ACTIVE:
          return todo.completed && isIncludeQuery;

        case FilterMethods.ALL:
        default:
          return isIncludeQuery;
      }
    });

    return todosToReturn;
  });

  const currentTodoID = useAppSelector(state => state.currentTodoID);
  const dispatch = useDispatch();

  return (
    <>
      {todosToShow.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {todosToShow.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={todo.id === currentTodoID ? 'has-background-info-light' : ''}
            >
              <td className="is-vcentered">
                {todo.id}
              </td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i
                      className="fas fa-check"
                    />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    dispatch(actionsWithTodoID.set(todo.id));
                  }}
                >
                  <span className="icon">
                    <i className={currentTodoID === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'}
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
