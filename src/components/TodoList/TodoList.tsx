/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { todosSlice } from '../../features/todos';
import { TodoComponent } from '../TodoComponent';

export const TodoList: React.FC = () => {
  const [error, setError] = useState<string>('');

  const { actions } = todosSlice;
  const { status, query } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleSetTodos = (todos: Todo[]) => {
    dispatch(actions.setTodos(todos));
  };

  useEffect(() => {
    getTodos()
      .then(todos => {
        let currentTodos = todos.filter(todo => {
          if (status === 'completed') {
            return todo.completed;
          } else if (status === 'active') {
            return !todo.completed;
          }
          return true;
        });

        if (query) {
          const lowerCaseQuery = query.toLowerCase();
          currentTodos = currentTodos.filter(todo =>
            todo.title.toLowerCase().includes(lowerCaseQuery),
          );
        }
        handleSetTodos(currentTodos);

        if (!currentTodos.length) {
          setError('There are no todos matching current filter criteria');
        } else {
          setError('');
        }
      })
  }, [dispatch, actions, status, query]);

  return (
    <>
      {error && !todos.length ? (
        <p className="notification is-warning" data-cy="errorMessage">
          {error}
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
            {todos.map((todo: Todo, index: number) => (
              <TodoComponent key={todo.id} todo={todo} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
