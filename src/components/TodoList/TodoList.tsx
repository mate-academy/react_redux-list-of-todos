/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';
import classNames from 'classnames';

interface Props {
  todosList: Todo[],
}

export const TodoList: React.FC<Props> = ({todosList}) => {
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const {status} = useAppSelector(state => state.filter);

  const isCurrentTodo = (id: number) => currentTodo?.id === id;

  const isFilteredListEmpty = status && !todosList.length

  return (
    <>
      {isFilteredListEmpty && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isFilteredListEmpty && (
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
            <th></th>
          </tr>
          </thead>

          <tbody>
          {todosList.map(todo => (
            <tr key={todo.id} data-cy="todo" className={classNames({
              'has-background-info-light': isCurrentTodo(todo.id),
            })}>
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
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                <span className="icon">
                  <i className={classNames('far', {
                    'fa-eye': !isCurrentTodo(todo.id),
                    'fa-eye-slash': isCurrentTodo(todo.id)
                  })} />
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
