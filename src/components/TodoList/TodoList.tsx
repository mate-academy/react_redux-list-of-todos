/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { FilterState } from '../../features/filter';
import { Todo } from '../../types/Todo';

const applyFilter = (todos: Todo[], filter: FilterState) => {
  const queriedTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.query.toLowerCase()),
  );

  switch (filter.status) {
    case 'active':
      return queriedTodos.filter(todo => !todo.completed);
    case 'completed':
      return queriedTodos.filter(todo => todo.completed);
    default:
      return queriedTodos;
  }
};

export const TodoList: React.FC = () => {
  const { todos, filter, currentTodo } = useSelector(
    (state: RootState) => state,
  );
  const filteredTodos = applyFilter(todos, filter);

  const dispatch = useDispatch();

  return (
    <>
      {filteredTodos.length === 0 ? (
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      {todo === currentTodo ? (
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
      )}
    </>
  );
};
