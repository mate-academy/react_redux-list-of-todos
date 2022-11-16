/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsTodo } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const query = useAppSelector((state) => state.filter.query);
  const status = useAppSelector((state) => state.filter.status);

  const lowerText = (str: string) => (
    str.toLowerCase().includes(query.toLowerCase())
  );

  const filterTodos = todos
    .filter((todo) => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;
        case Status.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    })
    .filter((todo) => lowerText(todo.title));

  const changeTodo = (todo: Todo) => {
    dispatch(actionsTodo.setTodo(todo));
  };

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

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
          {filterTodos.map((todo) => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({
                'has-background-info-light': selectedTodo?.id === todo.id,
              })}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span
                    className="icon"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
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
                  onClick={() => changeTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={classNames(
                        'far',
                        { 'fa-eye-slash': selectedTodo?.id === todo.id },
                        { 'fa-eye': selectedTodo?.id !== todo.id },
                      )}
                    />
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
