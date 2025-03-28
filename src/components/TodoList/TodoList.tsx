/* eslint-disable */
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectedTodoId?: number;
  onSelect?: (todo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoId,
  onSelect = () => {},
}) => {
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
        {todos &&
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectedTodoId={selectedTodoId}
              onSelect={onSelect}
            />
          ))}
      </tbody>
    </table>
  );
};
