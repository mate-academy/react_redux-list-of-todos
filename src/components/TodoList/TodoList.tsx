/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
}) => {
  const dispatch = useAppDispatch();

  const onSetTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!todos.length
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
                  data-cy="todo"
                  key={todo.id}
                  className={classNames(
                    { 'has-background-info-light': selectedTodo?.id === todo.id },
                  )}
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
                      className={classNames(
                        { 'has-text-danger': !todo.completed },
                        { 'has-text-success': todo.completed },
                      )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={onSetTodo.bind(null, todo)}
                    >
                      <span className="icon">
                        <i className={classNames(
                          'far',
                          { 'fa-eye': selectedTodo?.id !== todo.id },
                          { 'fa-eye-slash': selectedTodo?.id === todo.id },
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
