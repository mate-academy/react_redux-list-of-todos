import React from 'react';
import { useAppSelector } from '../../app/store';
import { TodoItem } from '../TodoItem/TodoItem';
import { FilterOption } from '../../types/FilterBy';
import { Todo } from '../../types/Todo';

const filterTodos = (
  todoList: Todo[],
  query: string,
  filterBy: string,
): Todo[] => {
  let filteredTodos = [...todoList];

  const sanitizedQuery = query.trim().toLowerCase();

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(sanitizedQuery),
    );
  }

  if (filterBy !== FilterOption.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterBy) {
        case FilterOption.ACTIVE: {
          return !todo.completed;
        }

        case FilterOption.COMPLETED: {
          return todo.completed;
        }

        default: {
          return true;
        }
      }
    });
  }

  return filteredTodos;
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
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
                todo={todo}
                isSelected={currentTodo?.id === todo.id}
                key={todo.id}
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
