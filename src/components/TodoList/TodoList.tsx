import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store';
import { actions } from '../../store/currentTodo';
import { Todo } from '../../types/Todo';
import { TodoModal } from '../TodoModal';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectors.getTodo);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const handleSelectingTodo = (todo: Todo, userId: number) => {
    dispatch(actions.setTodo(todo));

    setSelectedUserId(userId);
  };

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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={classNames(
              { 'has-background-info-light': todo === selectedTodo },
            )}
          >
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
              <p className={classNames(
                { 'has-text-danger': !todo.completed },
                { 'has-text-success': todo.completed },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleSelectingTodo(todo, todo.userId)}
              >
                <span className="icon">
                  <i className={classNames(
                    'far fa-eye',
                    { 'fa-eye-slash': todo === selectedTodo },
                  )}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}

        {selectedTodo && (
          <TodoModal selectedTodo={selectedTodo} userId={selectedUserId} />
        )}
      </tbody>
    </table>
  );
};
