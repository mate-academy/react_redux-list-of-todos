import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as todosActions from '../../features/todos';
import { filterTodos } from '../../app/functions';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoStatus } from '../../types/Status';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo) || null;
  const { status, query } = useAppSelector(state => state.filter);
  const { todos } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(todosActions.init());
  }, [dispatch]);

  // Приведення status до TodoStatus
  const todosToDisplay = filterTodos(todos, status as TodoStatus, query);

  return (
    <>
      {todosToDisplay.length === 0 ? (
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
            {todosToDisplay.map(todo => (
              <TodoItem key={todo.id} todo={todo} currentTodo={currentTodo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
