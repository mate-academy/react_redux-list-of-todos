/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as curTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();

  const eyeButtonClick = (todo: Todo) => {
    if (todo.id === currentTodo?.id) {
      dispatch(curTodoActions.removeTodo());

      return;
    }

    dispatch(curTodoActions.setTodo(todo));
  };

  return (
    <>
      {todos.length ? (
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
            {todos.map((todo) => {
              const { id, title, completed } = todo;

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed ? (
                      <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                    ) : ' '}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p className={completed ? 'has-text-success' : 'has-text-danger'}>{title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => eyeButtonClick(todo)}
                    >
                      <span className="icon">
                        <i className={classNames('far', {
                          'fa-eye': currentTodo?.id !== id,
                          'fa-eye-slash': currentTodo?.id === id,
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
