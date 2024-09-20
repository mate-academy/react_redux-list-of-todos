/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todo);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.query.toLowerCase()),
  );

  const getTodosToShow = filteredTodos.filter(todo => {
    switch (filter.status) {
      case 'All':
        return todo;
      case 'Active':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoAction.setTodo(todo));
  };

  return (
    <>
      {todos.length > 0 && getTodosToShow.length === 0 ? (
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
            {getTodosToShow.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={cn({
                  'has-background-info-light': currentTodo?.id === todo.id,
                })}
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
                  <p className={cn(todo.completed ? 'has-text-success' : 'has-text-danger')}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i className={cn('far', {
                      'fa-eye-slash': currentTodo?.id === todo.id,
                      'fa-eye': currentTodo?.id !== todo.id,
                    })} />
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
