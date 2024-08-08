import React from 'react';

import classNames from 'classnames';
import { useAppSelector } from '../../app/store';
import { flterByTypes } from '../../utils/FilterTypes';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filteredTodos = flterByTypes(status, todos, query);
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
        {filteredTodos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
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
                onClick={() => {
                  dispatch(setCurrentTodo(todo));
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': selectedTodo,
                      'fa-eye': !selectedTodo,
                    })}
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
