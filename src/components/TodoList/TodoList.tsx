import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList = () => {
  const todos = useAppSelector(state => state.todos) as Todo[];
  const { query: searchQuery, status } = useAppSelector(state => state.filter);

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const preparedTodos = [...todos]
    .filter((todo) => {
      const normalizedTitle = todo.title.toLowerCase().trim();

      return searchQuery ? normalizedTitle.includes(normalizedQuery) : true;
    })
    .filter((todo) => {
      switch (status) {
        case 'active': return !todo.completed;
        case 'completed': return todo.completed;
        default: return todo;
      }
    });

  return (
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
        {preparedTodos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))}
      </tbody>
    </table>
  );
};
