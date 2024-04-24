import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { State } from '../../features/filter';
import { Todo } from '../../types/Todo';

const getPreparedTodos = (todos: Todo[], filterBy: State) => {
  let preparedTodos = todos;

  if (filterBy.query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(filterBy.query.toLowerCase()),
    );
  }

  switch (filterBy.status) {
    case 'active':
      return preparedTodos.filter(todo => !todo.completed);
    case 'completed':
      return preparedTodos.filter(todo => todo.completed);
    default:
      return preparedTodos;
  }
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const preparedTodos = getPreparedTodos(todos, filter);

  return !preparedTodos.length && filter.query ? (
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
        {preparedTodos.map(todo => (
          <tr
            data-cy="todo"
            className={
              currentTodo?.id === todo.id ? 'has-background-info-light' : ''
            }
            key={todo.id}
          >
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
                  todo.completed ? 'has-text-success' : 'has-text-danger'
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
                onClick={() => dispatch(currentTodoActions.setTodo(todo))}
              >
                <span className="icon">
                  <i
                    className={currentTodo ? 'far fa-eye-slash' : 'far fa-eye'}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
