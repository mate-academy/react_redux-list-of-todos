/* eslint-disable */
import React from 'react';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoAtions } from '../../features/currentTodo';


type Filters = { status: Status, query: string }
type Props = { todos: Todo[] };

function getFilteredTodos(todos: Todo[], filters: Filters): Todo[] {
  const { status, query } = filters;
  let filteredTodos = [...todos];

  switch (status) {
    case Status.active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    case Status.all:
      break;
  }

  return filteredTodos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo)
  const filteredTodos = getFilteredTodos(todos, { status, query });

  return (
    <>
      {filteredTodos.length ? (
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
              const { id, title, completed } = todo;

              return (
                <tr data-cy="todo" key={id}>
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={`has-text-${completed ? 'success' : 'danger'}`}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(currentTodoAtions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={currentTodo ? "far fa-eye-slash" : "far fa-eye"} />
                      </span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
