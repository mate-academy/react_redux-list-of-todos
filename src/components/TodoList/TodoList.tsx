import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';

function searchInTitle(title: string, search: string) {
  return title.toLowerCase().includes(search.trim().toLowerCase());
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  let selectedTodos: Todo[];
  let visibleTodos: Todo[];

  switch (filter.status) {
    case 'active':
      selectedTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      selectedTodos = todos.filter(todo => todo.completed);
      break;

    default:
      selectedTodos = todos;
      break;
  }

  if (filter.query) {
    visibleTodos = selectedTodos.filter(
      todo => searchInTitle(todo.title, filter.query),
    );
  } else {
    visibleTodos = selectedTodos;
  }

  const todoRowClass = (todo: Todo) => classNames({
    'has-background-info-light': currentTodo && currentTodo.id === todo.id,
  });

  const todoTextClass = (todo: Todo) => classNames({
    'has-text-success': todo.completed,
    'has-text-danger': !todo.completed,
  });

  const iconClass = (todo: Todo) => classNames({
    'far fa-eye-slash': currentTodo && currentTodo.id === todo.id,
    'far fa-eye': !(currentTodo && currentTodo.id === todo.id),
  });

  return (
    <>
      {visibleTodos.length <= 0 ? (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
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
            {visibleTodos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={todoRowClass(todo)}
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
                  <p className={todoTextClass(todo)}>{todo.title}</p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(currentTodoActions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={iconClass(todo)} />
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
