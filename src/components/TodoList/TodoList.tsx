/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions} from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    if (
      filter.query &&
      !todo.title.toLowerCase().includes(filter.query.toLowerCase())
    ) {
      return false;
    }

    switch (filter.status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {todos.length > 0 && filteredTodos.length === 0 ? (
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
            {filteredTodos.map(todo => {
              const isCurrentTodo = currentTodo?.id === todo.id;

              return (
                <tr data-cy="todo" key={todo.id} className={classNames(isCurrentTodo ? 'has-background-info-light' : '')}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={classNames(todo.completed ? 'has-text-success' : 'has-text-danger ')}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" type="button" onClick={() => setCurrentTodo(todo)}>
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye': !isCurrentTodo,
                        'fa-eye-slash': isCurrentTodo,
                      })} />
                    </span>
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      )}

    </>
  );
};
