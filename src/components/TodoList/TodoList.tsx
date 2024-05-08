/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as setTodoActions } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filterTodo = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleToogle = (todo: Todo) => {
    dispatch(setTodoActions.setTodo(todo));
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    const title = todo.title
      .toLowerCase()
      .includes(filterTodo.query.toLowerCase());

    switch (filterTodo.status) {
      case 'active':
        return !todo.completed && title;

      case 'completed':
        return todo.completed && title;

      default:
        return title;
    }
  });

  return (
    <>
      {!filteredTodos.length ? (
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
            {filteredTodos.map((todo: Todo) => {
              return (
                <tr
                  data-cy="todo"
                  className={cn({
                    'has-background-info-light': currentTodo === todo,
                  })}
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
                      className={cn({
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
                      onClick={() => handleToogle(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye-slash': currentTodo?.id === todo.id,
                            'fa-eye': currentTodo?.id !== todo.id,
                          })}
                        />
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
