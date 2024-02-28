/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const filterTodos = () => {
    if (!todos) {
      return todos;
    }

    let todosToFilter = [...todos];

    switch (filter.status) {
      case 'all':
        break;

      case 'active':
        todosToFilter = todosToFilter.filter(todo => !todo.completed);
        break;

      case 'completed':
        todosToFilter = todosToFilter.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    todosToFilter = todosToFilter.filter(todo =>
      todo.title.includes(filter.query),
    );

    return todosToFilter;
  };

  const todosToView = filterTodos();

  return (
    <>
      {todosToView && (
        <>
          {todosToView.length > 0 ? (
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
                {todosToView.map(todo => (
                  <tr data-cy="todo" key={todo.id}>
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      {todo.completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check"></i>
                        </span>
                      )}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p
                        className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
                      >
                        {todo.title}
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
                          <i className="far fa-eye" />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )}
        </>
      )}
    </>
  );
};
