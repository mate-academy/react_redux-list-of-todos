/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface IProps {
  todos: Todo[];
}

export const TodoList: React.FC<IProps> = ({ todos }) => {
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      {!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
            const isSelected = id === currentTodo?.id;

            const setCurrentTodo = () => dispatch(currentTodoActions.setTodo(todo));

            return (
              <tr
                data-cy="todo"
                className={clsx({ 'has-background-info-light': isSelected })}
                key={id}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={clsx({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={setCurrentTodo}
                  >
                    <span className="icon">
                      <i
                        className={clsx('far', {
                          'fa-eye': !isSelected,
                          'fa-eye-slash': isSelected,
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
    </>
  );
};
