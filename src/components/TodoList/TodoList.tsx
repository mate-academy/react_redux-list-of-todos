/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { getFilteredTodos } from '../../utils/getFilterredTodos';
import { selectCurrentTodo, selectFilter, selectTodos, setCurrentTodo } from '../../features';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const activeTodo = useAppSelector(selectCurrentTodo);
  const filter = useAppSelector(selectFilter);
  const filteredTodos = getFilteredTodos(todos, filter);

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
        {filteredTodos.map(todo => {
          const isSelected = activeTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': isSelected,
              })}
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
                  className={
                    todo.completed ? 'has-text-success' : 'has-text-danger'
                  }
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
                    <i
                      className={
                        !activeTodo ? 'far fa-eye' : 'far fa-eye-slash'
                      }
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
