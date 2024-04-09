import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  const dispatch = useDispatch();

  const setCurrentTodo = (todo: Todo) => dispatch(actions.setTodo(todo));

  const currentTodo = useAppSelector(state => state.currentTodo);

  // const { id, completed } = todoList;

  return (
    <>
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
          {todoList.map(({ id, completed, title, userId }) => {
            return (
              <tr data-cy="todo" key={id}>
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
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
                  >
                    <span className="icon" onClick={() => setCurrentTodo({ id, completed, title, userId })}>
                      {currentTodo?.id === id ? (
                        <i className="far fa-eye-slash" />
                      ) : (
                        <i className="far fa-eye" />
                      )}
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
