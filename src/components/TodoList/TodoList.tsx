import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../../utils/filteredTodos';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const preparedTodos = filterTodos(todos, status as Status, query);

  const handleModal = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
  };

  return (
    <>
      {!preparedTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!preparedTodos.length && (
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
            {preparedTodos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': todo.id === currentTodo?.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check"></i>
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
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
                    onClick={() => handleModal(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': todo.id !== currentTodo?.id,
                          'fa-eye-slash': todo.id === currentTodo?.id,
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
