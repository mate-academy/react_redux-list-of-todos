/* eslint-disable */

import { TodoLine } from '../TodoLine/TodoLine';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);

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
        {todos.map((todo: Todo) => (
          <TodoLine
            key={todo.id}
            todo={todo}
            isSelected={selectedTodo === todo}
          />
        ))}
      </tbody>
    </table>
  );
};
