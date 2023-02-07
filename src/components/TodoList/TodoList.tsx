/* eslint-disable max-len */
import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const currentStatus = useAppSelector(state => state.filter.status);
  const currentQuery = useAppSelector(state => state.filter.query);

  let visibleTodos = todos;

  if (currentStatus !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      switch (currentStatus) {
        case ('active'):
          return todo.completed === false;

        case ('completed'):
          return todo.completed === true;

        default: return 0;
      }
    });
  }

  if (currentQuery !== '') {
    const lowerQuery = currentQuery.toLocaleLowerCase();

    visibleTodos = visibleTodos.filter(todo => todo.title.includes(lowerQuery));
  }

  return (
    <>
      {visibleTodos.length <= 0
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
              {visibleTodos.map(todo => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={classNames('',
                    {
                      'has-background-info-light': todo.id === currentTodo?.id,
                    })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  {!todo.completed
                    ? (<td className="is-vcentered"> </td>)
                    : (
                      <td className="is-vcentered"><span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span></td>
                    )}
                  <td className="is-vcentered is-expanded">
                    <p className={classNames(
                      { 'has-text-success': todo.completed },
                      { 'has-text-danger': !todo.completed },
                    )}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    {todo.id === currentTodo?.id
                      ? (
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                        >
                          <span className="icon">
                            <i className="far fa-eye-slash" />
                          </span>
                        </button>
                      ) : (
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => dispatch(setTodo(todo))}
                        >
                          <span className="icon">
                            <i className="far fa-eye" />
                          </span>
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
