/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  todosAfterSearch: Todo[] | []
};

export const TodoList: React.FC<Props> = ({ todosAfterSearch }) => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const setCurrentTodo = (todo: Todo) => dispatch(actions.setTodo(todo));
  const activeTodo = useAppSelector(state => state.currentTodo);
  const todosForView = todosAfterSearch.length ? todosAfterSearch : todos;

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
          {
            todosForView && (todosForView.map((todo) => (
              <tr
                data-cy="todo"
                className={classNames(
                  { 'has-background-info-light': todo.id === activeTodo?.id },
                )}
                key={todo.id}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed
                    && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(
                      {
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
                      },
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
                    onClick={() => setCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far',
                        {
                          'fa-eye': todo.id !== activeTodo?.id,
                          'fa-eye-slash': todo.id === activeTodo?.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            )))
          }
        </tbody>
      </table>
    </>
  );
};
