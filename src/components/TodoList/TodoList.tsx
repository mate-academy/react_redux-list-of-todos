/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as TodosActions } from '../../features/todos';
import { actions as CurrentTodoActions } from '../../features/currentTodo';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { getPreparedTodos } from '../../utils/getPreparedTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setCurrentTodo = (todo: Todo) => {
    dispatch(CurrentTodoActions.setTodo(todo));
  };

  useEffect(() => {
    getTodos()
      .then(todosData => dispatch(TodosActions.setLoadTodos(todosData)));
  }, []);

  const visibleTodos = useMemo(() => {
    return getPreparedTodos(todos, query, status);
  }, [query, status, todos]);

  return (
    <>
      {(visibleTodos.length === 0 && todos.length !== 0) && (
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
          {visibleTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn({
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
                  onClick={() => setCurrentTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn({
                      'far fa-eye': currentTodo !== todo,
                      'far fa-eye-slash': currentTodo === todo,
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
