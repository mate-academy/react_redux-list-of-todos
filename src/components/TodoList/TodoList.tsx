/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todosState = useAppSelector(state => state.todos);
  const currentTodoState = useAppSelector(state => state.currentTodo);
  const queryState = useAppSelector(state => state.filter.query);
  const statusState = useAppSelector(state => state.filter.status);

  const filterTodos = (
    todos: Todo[],
    query: string,
    status: Status,
  ) => {
    const filteredByQuery = todos.filter(
      todo => todo.title.toLowerCase()
        .includes(query.toLowerCase().trim()),
    );

    switch (status) {
      case 'active':
        return filteredByQuery.filter(todo => !todo.completed);

      case 'completed':
        return filteredByQuery.filter(todo => todo.completed);

      default:
        return filteredByQuery;
    }
  };

  const visibleTodos = filterTodos(todosState, queryState, statusState);

  const handleOnClick = (selectedTodo: Todo) => {
    dispatch(actions.setTodo(selectedTodo));
  };

  return (
    <>
      {visibleTodos.length === 0
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
              {visibleTodos.map(todo => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={classNames('', {
                    'has-background-info-light': currentTodoState === todo,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed
                    && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      // className="has-text-danger"
                      className={classNames('', {
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
                      onClick={() => handleOnClick(todo)}
                    >
                      <span className="icon">
                        <i className={classNames('far', {
                          'fa-eye-slash': currentTodoState === todo,
                          'fa-eye': currentTodoState !== todo,
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
