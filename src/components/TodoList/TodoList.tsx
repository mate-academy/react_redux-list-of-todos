import { useAppSelector } from '../../app/hooks';
import { Filter } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const todos = useAppSelector<Todo[]>(state => state.todos);
  const filter = useAppSelector<Filter>(state => state.filter);

  const filteredTodos = todos.filter(todo => {
    const lowerCaseQuery = filter.query.toLowerCase();
    const lowerCaseTitle = todo.title.toLowerCase();

    switch (filter.status) {
      case 'active':
        return !todo.completed && lowerCaseTitle.includes(lowerCaseQuery);
      case 'completed':
        return todo.completed && lowerCaseTitle.includes(lowerCaseQuery);
      case 'all':
      default:
        return lowerCaseTitle.includes(lowerCaseQuery);
    }
  });

  return (
    <>
      {filteredTodos.length ? (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th aria-label="icon">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>
              <th>Title</th>
              <th> ‎ </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
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
