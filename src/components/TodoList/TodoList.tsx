/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { filterByQuery, filterByStatus } from '../../unitls/filterHelper';
import { actions as currentTodoAction } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, error } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const { todo: currentTodo } = useAppSelector(state => state.currentTodo);
  const [filteredTodos, setFiltedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setFiltedTodos(filterByStatus(filterByQuery(todos, query), status));
  }, [todos, query, status]);

  if (error) {
    return (
      <p className="notification is-warning">There is an error: {error}</p>
    );
  }

  if (filteredTodos.length < 1) {
    return (
      <p className="notification is-warning">
        There are no Todos matching current filter criteria
      </p>
    );
  }

  const handleModalToggle = (todo: Todo) => {
    if (currentTodo) {
      dispatch(currentTodoAction.clearCurrent());
      return;
    }
    dispatch(currentTodoAction.setCurrent(todo));
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
        {filteredTodos &&
          filteredTodos.map((todo: Todo) => {
            return (
              <tr key={todo.id} data-cy="todo" className="">
                <td className="is-vcentered">{todo?.id}</td>

                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo?.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span
                      className="icon"
                      onClick={() => {
                        handleModalToggle(todo);
                      }}
                    >
                      <i
                        className={classNames(
                          'far',
                          currentTodo?.id !== todo.id
                            ? 'fa-eye'
                            : 'fa-eye-slash',
                        )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
