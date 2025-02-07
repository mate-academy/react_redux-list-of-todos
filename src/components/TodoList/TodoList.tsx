import { TodoModal } from '../TodoModal';
import { TodoItem } from '../TodoItem/TodoItem';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { query, status } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesSort =
      status === Status.All ||
      (status === Status.Active && !todo.completed) ||
      (status === Status.Completed && todo.completed);

    return matchesSearch && matchesSort;
  });

  return (
    <>
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
            <TodoItem key={todo.id} todo={todo} selectedTodo={selectedTodo} />
          ))}
        </tbody>
      </table>

      {selectedTodo && <TodoModal />}
    </>
  );
};
