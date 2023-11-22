/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

interface Props {
  todos: Todo[] | null,
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();

  const selected = useAppSelector(state => state.currentTodo);

  const onSelectButtonClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {!todos?.length && (
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
          {todos?.map(todo => (
            <tr key={`${todo.title}-${todo.id}`} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelectButtonClick(todo)}
                >
                  <span className="icon">
                    <i className={classNames('far', selected?.id === todo.id ? 'fa-eye-slash' : 'fa-eye')} />
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
