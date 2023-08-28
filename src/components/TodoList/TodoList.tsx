/* eslint-disable max-len */
import React, { useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { filterTodos } from '../../helpers/filterTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const setCurrentTodo = (todo: Todo) => (
    dispatch(currentTodoActions.setTodo(todo))
  );

  const filterTodosFromServer = (search: string, todoStatus: string) => {
    const formattedQuery = search.toLowerCase().trim();

    return filterTodos(
      todos,
      todoStatus,
      formattedQuery,
    );
  };

  const filteredTodos = useMemo(() => {
    return filterTodosFromServer(query, status);
  }, [todos, query, status]);

  return (
    <>
      {filteredTodos.length === 0
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
              {filteredTodos.map(todo => (
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
                      className={cn({
                        'has-text-danger': !todo.completed,
                        'has-text-success': todo.completed,
                      })}
                    >
                      {todo.title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    {currentTodo?.id === todo.id
                      ? (
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={
                            () => dispatch(currentTodoActions.removeTodo())
                          }
                        >
                          <span className="icon">
                            <i className="far fa-eye-slash" />
                          </span>
                        </button>
                      )
                      : (
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => setCurrentTodo(todo)}
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
