import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {todos.length === 0
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
              {todos.map(todo => (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': currentTodo === todo,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed === true && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={classNames({
                      'has-text-success': todo.completed === true,
                      'has-text-danger': todo.completed === false,
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
                      onClick={() => handleClick(todo)}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          {
                            'fa-eye-slash': currentTodo === todo,
                            'fa-eye': currentTodo !== todo,
                          },
                        )}
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
