/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { setTodo } from '../../features/currentTodo';
import { filterTodos } from '../../features/filteringTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filters = useAppSelector(state => state.filter);
  console.log(filters.status);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const isError = todos.length === 0;

  const filteredTodos = filterTodos(todos, filters.status, filters.query);

  function handleSetTodo(todo: Todo) {
    dispatch(setTodo(todo));
  };

  return (
    <>
      {isError && (<p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>)}

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
            <tr data-cy="todo" className={cn(todo.id === currentTodo?.id ? 'has-background-info-light' : '')} key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn(todo.completed ? 'has-text-success' : 'has-text-danger')}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSetTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn('far', currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye')} />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
