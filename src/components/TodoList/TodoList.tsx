import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      {!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {todos.length > 0 && (
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
        )}
        <tbody>
          {todos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr key={id} data-cy="todo">
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
                    className={cn({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={cn({
                          'far fa-eye': currentTodo !== todo,
                          'far fa-eye-slash': currentTodo === todo,
                        })}
                      />
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
