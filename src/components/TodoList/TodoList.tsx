import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getPreparedTodos } from '../../utils/getPreparedTodos';

export const TodoList: React.FC = () => {
  const todos:Todo[] = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, status, query);
  }, [todos, status, query]);

  const handleChangeSelectTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
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
        {visibleTodos.map((todo: Todo) => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
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
                className={classNames(todo.completed === true
                  ? 'has-text-success' : 'has-text-danger')}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => handleChangeSelectTodo(todo)}
              >
                <span className="icon">
                  <i className={classNames(todo.id !== currentTodo?.id
                    ? 'far fa-eye' : 'far fa-eye-slash')}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
