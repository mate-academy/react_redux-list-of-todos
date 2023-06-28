/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

interface TodoListInterface {
  todos: Todo[],
}

export const TodoList: React.FC<TodoListInterface> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleClickModal = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
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
              {todos.map(todo => {
                const { id, title, completed } = todo;

                return (
                  <tr data-cy="todo" key={id} className={currentTodo?.id === todo.id ? 'has-background-info-light' : ''}>
                    <td className="is-vcentered">
                      {id}
                    </td>
                    <td className="is-vcentered">
                      {completed
                        && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
                    </td>

                    <td className="is-vcentered is-expanded">
                      <p className={completed ? 'has-text-success' : 'has-text-danger'}>{title}</p>
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button data-cy="selectButton" className="button" type="button" onClick={() => handleClickModal(todo)}>
                        <span className="icon">
                          <i className={currentTodo?.id === todo.id ? 'far fa-eye-slash' : 'far fa-eye'} />
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
