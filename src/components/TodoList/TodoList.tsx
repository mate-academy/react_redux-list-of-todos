/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';
import { TodoItem } from '../TodoItem';

const filterTodos = (
  todos: Todo[],
  query: string,
  filterBy: FilterBy,
): Todo[] => {
  let filteredTodos = [...todos];

  const sanitizedQuery = query.toLowerCase().trim();

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(sanitizedQuery),
    );
  }

  if (filterBy) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterBy) {
        case FilterBy.ACTIVE:
          return !todo.completed;
        case FilterBy.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return filteredTodos;
};

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const filteredTodos = filterTodos(todos, query, status);

  return (
    <>
      {filteredTodos.length ? (
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
                key={todo.id}
                todo={todo}
                isSelected={currentTodo?.id === todo.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
