/* eslint-disable max-len */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type PropTypes = {
  todos: Todo[]
};

export const TodoList: React.FC<PropTypes> = ({ todos }) => {
  const dispatch = useDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleClick = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  if (!todos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <div>
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
            const isSelected = currentTodo?.id === todo.id;

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
                  <p className={
                    completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleClick(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
                          isSelected
                            ? 'far fa-eye-slash'
                            : 'far fa-eye'
                        }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
