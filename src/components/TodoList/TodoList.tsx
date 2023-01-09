import { useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos);

  const getFilteredTodos = (todosList: Todo[]) => {
    if (!todosList.length) {
      return [];
    }

    return todosList.filter(todo => {
      const normalizedBase = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase().trim();
      const currentQuery = normalizedBase.includes(normalizedQuery);

      switch (status) {
        case 'active':
          return !todo.completed && currentQuery;

        case 'completed':
          return todo.completed && currentQuery;

        default:
        case 'all':
          return todo && currentQuery;
      }
    });
  };

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos)
  ), [todos, query, status]);

  return (
    <>
      {!filteredTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0
        && (
          <table
            className="
              table
              is-narrow
              is-fullwidth"
          >
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
                />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
