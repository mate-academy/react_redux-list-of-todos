/* eslint-disable max-len */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, currentTodo, filter } = useAppSelector(store => store);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const handleCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  useMemo(() => {
    const newTodos = getFilteredTodos(todos, filter);

    setFilteredTodos(newTodos);
  }, [filter, setFilteredTodos, todos]);

  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              {}
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th>{}</th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todo => (
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
                <p className={classNames(todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger')}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {' '}
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleCurrentTodo(todo)}
                >
                  {}
                  <span className={classNames(currentTodo?.id !== todo.id
                    ? 'far fa-eye'
                    : 'far fa-eye-slash')}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
