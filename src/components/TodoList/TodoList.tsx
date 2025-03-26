/* eslint-disable */
import React, { useCallback, useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { AppDispatch } from '../../app/store';

export const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { actions: currentTodoActions } = currentTodoSlice;
  const {todos, currentTodo, filter } = useAppSelector(state => state);
  const { query, status } = filter;

  const titleMatchesQuery = useCallback((title: string, query: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  }, [])

  const selectTodo = useCallback(
    (newTodo: Todo) => dispatch(currentTodoActions.set(newTodo)),
    [dispatch, currentTodoActions],
  );

  const filteredTodos: Todo[] = useMemo(() => {
    return status === 'all'
      ? todos.filter(todo => titleMatchesQuery(todo.title, query))
      : todos.filter(todo =>
        (todo.completed === (status === 'completed'))
        && (titleMatchesQuery(todo.title, query))
      );
  }, [todos, query, status])

  return (
    <>
      {filteredTodos.length === 0 && (
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
                <p className={cn({
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed
                  })}
                >{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => selectTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn('far', {
                      'fa-eye': todo !== currentTodo,
                      'fa-eye-slash': todo === currentTodo,
                    })}/>
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
