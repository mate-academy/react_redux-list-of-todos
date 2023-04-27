/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state);

  const onClick = (todo: Todo) => {
    dispatch(currentTodoAction.setTodo(todo));
  };

  return (
    <>
      {!todos.length
        ? (
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
              {todos.map((todo) => (
                <tr
                  key={todo.id}
                  data-cy="todo"
                >
                  <td className="is-vcentered">
                    {todo.id}
                  </td>

                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      { 'has-text-danger': !todo.completed },
                      { 'has-text-success': todo.completed },
                    )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      onClick={() => onClick(todo)}
                      data-cy="selectButton"
                      className="button"
                      type="button"
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far fa-eye',
                          { 'fa-eye-slash': currentTodo?.id === todo.id },
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
