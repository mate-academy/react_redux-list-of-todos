/* eslint-disable max-len */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import '../../App.scss';

type T = {
  user: User | null
};

export const TodoList: React.FC<T> = ({ user }) => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector((state: RootState) => state.todos);
  const thisTodo: Todo | null
    = useSelector((state: RootState) => state.currentTodo);

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
                <th aria-label="icon">
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                </th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {todos.map(todo => (
                <tr data-cy="todo" key={todo.id} className="">
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>
                  <td className="is-vcentered is-expanded">
                    <p className={`has-text-${todo.completed ? 'success' : 'danger'}`}>{todo.title}</p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(actions.setTodo(todo))}
                    >
                      <span className="icon">
                        <span className="hidden">Hidden text</span>
                        <i className={
                          thisTodo && todo.id === user?.id
                            ? 'far fa-eye-slash' : 'far fa-eye'
                        }
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
