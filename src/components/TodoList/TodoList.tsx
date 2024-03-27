/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

const filterTodos = (todos: Todo[], status: Status, query: string) => {
  let filteredTodos = todos;

  if (status) {
    switch (status) {
      case Status.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      case Status.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case Status.All:
      default:
        filteredTodos = filteredTodos;
        break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const filteredTodos = filterTodos(todos, status, query);

  const isTodosEmpty = filteredTodos.length === 0;

  return (
    <>
      {isTodosEmpty && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isTodosEmpty && (
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
              const isSelectedTodo = currentTodo?.id === id;

              return (
                <tr
                  key={id}
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isSelectedTodo,
                  })}
                >
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
                      className={classNames({
                        'has-text-success': completed,
                        'has-text-danger': !completed,
                      })}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        setTodo(todo);
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelectedTodo,
                            'fa-eye-slash': isSelectedTodo,
                          })}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
