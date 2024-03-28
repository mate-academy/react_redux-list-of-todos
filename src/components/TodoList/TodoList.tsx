/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { actions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

function getFilteredTodos(todos: Todo[], filteredBy: string) {
  switch (filteredBy) {
    case Status.All:
      return todos;

    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
}
export const TodoList: React.FC = ({ }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filteres = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, filteres.filter).filter(todo =>
    todo.title.toLowerCase().includes(filteres.query.toLowerCase()),
  );
  return (
    <>
      {!filteredTodos.length ? (<p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>)
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
              {filteredTodos.map(todo => (
                <tr data-cy="todo" key={todo.id}>
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
                    <p className={classNames(todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger')}
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
                        <i
                          className={classNames(selectedTodo?.id === todo.id
                            ? 'far fa-eye-slash'
                            : 'far fa-eye')}
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
