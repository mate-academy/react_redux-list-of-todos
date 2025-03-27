/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const filter = useSelector((state: RootState) => state.filter.status);
  const search = useSelector((state: RootState) => state.filter.query);

  const dispatch = useDispatch();

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let filteredTodos = [...todos];

    switch (filter) {
      case 'all':
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (search) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setVisibleTodos(filteredTodos);
  }, [filter, search]);

  return (
    <>
      {visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {visibleTodos.map(todo => {
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      <i className={classNames({
                        "far fa-eye": currentTodo?.id !== todo.id,
                        "far fa-eye-slash": currentTodo?.id === todo.id,
                      })} />
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
