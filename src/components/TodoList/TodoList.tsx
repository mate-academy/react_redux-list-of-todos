import { useAppSelector } from '../../app/hooks';
import { getNormalisedTodos } from '../../utils/helpers';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const preparedTodos = getNormalisedTodos(todos, query, status);

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
        {preparedTodos.map((todo, index) => (
          <TodoItem
            todo={todo}
            index={index}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
