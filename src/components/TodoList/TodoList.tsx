import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const handleFilteringTodos = (todosList: Todo[]) => {
    let initialTodos = [...todosList];

    if (query) {
      const lowerQuery = query.toLowerCase().trim();

      initialTodos = initialTodos.filter(searchedTodo => (
        searchedTodo.title.toLowerCase().includes(lowerQuery)
      ));
    }

    switch (status) {
      case 'active':
        initialTodos = initialTodos.filter(
          visibleTodo => !visibleTodo.completed,
        );
        break;
      case 'completed':
        initialTodos = initialTodos.filter(
          visibleTodo => visibleTodo.completed,
        );
        break;
      case 'all':
      default:
        break;
    }

    return initialTodos;
  };

  const filteredTodos = useMemo(() => {
    if (todos) {
      return handleFilteringTodos(todos);
    }

    return [];
  }, [todos, query, status]);

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
