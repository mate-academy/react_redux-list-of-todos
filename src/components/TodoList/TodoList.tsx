import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todosActions } from '../../features/todos';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const filteredTodos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    if (status === 'all') {
      dispatch(todosActions.all(todos, query));
    }

    if (status === 'active') {
      dispatch(todosActions.active(todos, query));
    }

    if (status === 'completed') {
      dispatch(todosActions.completed(todos, query));
    }
  }, [status, query, todos]);

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
            {filteredTodos.map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
