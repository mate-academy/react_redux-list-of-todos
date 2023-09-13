import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { filterTodos } from '../../utils/filterTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const allTodos = todos.todos;
  const filter = useAppSelector(state => state.filter);
  const { query, status } = filter;
  const currTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const filteredTodos = filterTodos(allTodos, query, status);

  const setCurrTodo = (todo: Todo) => {
    return dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {filteredTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map((todo) => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': currTodo?.id === todo.id,
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
                  <p className={classNames({
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
                    onClick={() => setCurrTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye': todo.id !== currTodo?.id,
                        'fa-eye-slash': todo.id === currTodo?.id,
                      })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
