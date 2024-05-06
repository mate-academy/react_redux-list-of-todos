/* eslint-disable */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleClickTodo = (todo: Todo) => {
    dispatch(currentTodoAction.setTodo(todo));
  };

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
          {filteredTodos ? (
            filteredTodos.map((todo: Todo) => {
              return (
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
                      onClick={() => handleClickTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames(
                            'far',
                            currentTodo === todo ? 'fa-eye-slash' : 'fa-eye',
                          )}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )}
        </tbody>
      </table>
    </>
  );
};
