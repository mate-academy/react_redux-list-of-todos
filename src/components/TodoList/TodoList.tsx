import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../utils/hooks';
import { getFilteredTodos } from '../../utils/filter';
import TodoItem from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <>
      {!filteredTodos.length ? (
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
            {filteredTodos.map(todo => {
              return <TodoItem todo={todo} key={todo.id} />;
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
