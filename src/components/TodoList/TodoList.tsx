/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function normalizeQuery(query: string) {
  return query.toLowerCase().trim();
}

function filterTodos(todos: Todo[], sortType: Status, query: string): Todo[] {
  let copyTodos = [...todos];

  switch (sortType) {
    case 'active':
      copyTodos = copyTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      copyTodos = copyTodos.filter(todo => todo.completed);
      break;
    case 'all':
    default: break;
  }

  return copyTodos.filter(todo => normalizeQuery(todo.title)
    .includes(normalizeQuery(query)));
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, filter, currentTodo } = useAppSelector((state) => state);
  const filteredTodos = filterTodos(todos, filter.status, filter.query);

  return (
    <>
      {!filteredTodos.length && (
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
          {filteredTodos.map(todo => (
            <tr
              data-cy="todo"
              key={todo.id}
              className={cn({
                'has-background-info-light': currentTodo?.id === todo.id,
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
                  className={cn({
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
                  onClick={() => {
                    dispatch(actionsCurrentTodo.setTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn({
                        'far fa-eye': currentTodo?.id !== todo.id,
                        'far fa-eye-slash': currentTodo?.id === todo.id,
                      })}
                    />
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
