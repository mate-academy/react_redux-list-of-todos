/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const filteredTodosByQuery = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.query.toLowerCase())
  );
  const filteredTodos = filteredTodosByQuery.filter(todo => {
    if (filter.status === 'all') {
      return true;
    }

    if (filter.status === 'active') {
      return !todo.completed;
    }
    return todo.completed;
  });

  return (
    <>
    {filteredTodos.length === 0 && (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    )}
    {filteredTodos.length > 0 && (
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
              key={todo.id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': currentTodo?.id === todo.id,
              })}
            >
              <td>{todo.id}</td>
              <td>
                {todo.completed ? (
                  <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
                ) : null}
              </td>
              <td>
                <p
                  className={classNames({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  })}
                  >
                    {todo.title}
                  </p>
              </td>
              <td>
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye': currentTodo?.id !== todo.id,
                      'fa-eye-slash': currentTodo?.id === todo.id,
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
