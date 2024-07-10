/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  setIsTodoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  selectedTodo: Todo | null;
  setIsUserloaded: React.Dispatch<React.SetStateAction<boolean>>;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  setIsTodoModalOpen,
  setSelectedUser,
  setSelectedTodo,
  selectedTodo,
  setIsUserloaded,
  todos,
}) => {
  return (
    <>
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
                      'has-text-success': todo.completed,
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
                    onClick={() => {
                      getUser(todo.userId)
                        .then(setSelectedUser)
                        .finally(() => setIsUserloaded(true));
                      setSelectedTodo(todo);
                      setIsTodoModalOpen(true);
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': todo.id !== selectedTodo?.id,
                          'fa-eye-slash': todo.id === selectedTodo?.id,
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
};
