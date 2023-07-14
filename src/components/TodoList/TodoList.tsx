/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { StatusType } from '../../types/Status';

export const TodoList: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLocaleLowerCase()))
    .filter(todo => {
      switch (status) {
        case StatusType.COMPLETED:
          return todo.completed;

        case StatusType.ACTIVE:
          return !todo.completed;
        default:
          return true;
      }
    });

  const handleSelect = (todo: Todo) => dispatch(
    currentTodoActions.setTodo(todo),
  );

  useEffect(() => {
    setTodosList(filteredTodos);
  }, [todos, status, query]);

  return (
    <>
      {!todosList.length ? (
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
            {todosList.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={todo === currentTodo ? 'has-background-info-light' : ''}
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
                    className={todo.completed ? 'has-text-success' : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleSelect(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye-slash': todo === currentTodo,
                        'fa-eye': todo !== currentTodo,
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
