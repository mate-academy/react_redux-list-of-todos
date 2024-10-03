/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(({ todoList }) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch: AppDispatch = useDispatch();

  const handleEyeClick = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  TodoList.displayName = 'TodoList';
  return (
    <>
      {!todoList.length ? (
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
            {todoList.map(todo => (
              <tr key={todo.id} data-cy="todo" className="">
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
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() => handleEyeClick(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye-slash':
                            currentTodo && currentTodo.id === todo.id,
                          'fa-eye': !currentTodo || currentTodo.id !== todo.id,
                        })}
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
});
