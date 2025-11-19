/* eslint-disable */
import { Notification } from './Notification';
import { TodoElement } from './TodoElement';
import { useAppSelector } from '../../app/hooks';

export const TodoList = () => {
  const filter = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const filteredTodos = todos.filter(todo => {
    if (filter.status === 'completed' && !todo.completed) {
      return false;
    }

    if (filter.status === 'active' && todo.completed) {
      return false;
    }

    if (
      filter.query &&
      !todo.title.toLowerCase().includes(filter.query.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  console.log(filteredTodos.length);

  return filteredTodos.length === 0 ? (
    <Notification />
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
          <TodoElement key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
