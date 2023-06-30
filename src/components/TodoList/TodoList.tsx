/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[] | undefined,
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
}) => {
  const dispatch = useDispatch();

  if (todos?.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
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
        {todos && todos.map(todo => {
          return (
            <tr key={todo.id} data-cy="todo" className="">
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
              <td className="is-vcentered is-expanded">
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {selectedTodo && todo.id === selectedTodo.id ? (
                  <button
                    data-cy="selectButton"
                    className="button is-link"
                    type="button"
                    onClick={() => {
                      dispatch(actions.removeTodo());
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  </button>
                ) : (
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => {
                      dispatch(actions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  );
};
