/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();

  const handleCurrentTodo = (todo: Todo) => {
    dispatch(actions.loadTodo(true))
    setTimeout(() => {
      dispatch(actions.setTodo(todo))
      dispatch(actions.loadTodo(false))
    }, 1000)
  };

  return (
    <>
      {todos && true}
      {todos.length === 0 ? (
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
          {todos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
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
                  className={cn({
                    'has-text-danger': !todo.completed,
                    'has-text-success': todo.completed
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
                  onClick={() => handleCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
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
