/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/store';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useDispatch } from 'react-redux';
import { currentTodoActions } from '../../features/currentTodo';

function filter(todos: Todo[], query: string = '', status: Status = 'all') {
  let filteredTodos = [...todos];
  if (status !== 'all') {
    const isCompleted = status === 'completed';

    filteredTodos = filteredTodos.filter(
      todo => todo.completed === isCompleted,
    );
  }

  if (query !== '') {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }

  return filteredTodos;
}

export const TodoList: React.FC = () => {
  const {
    todos,
    filter: { query, status },
    currentTodo,
  } = useAppSelector(state => state);
  const dispatch = useDispatch();

  const filteredTodos = filter(todos, query, status);

  return (
    <>
      {filteredTodos.length === 0 && (
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
          {filteredTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={
                    !todo.completed ? 'has-text-danger' : 'has-text-success'
                  }
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(currentTodoActions.set(todo))}
                >
                  <span className="icon">
                    {currentTodo && currentTodo.id === todo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
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
