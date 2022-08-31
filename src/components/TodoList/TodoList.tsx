import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = memo(({ todos }) => (
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
      {todos.map(todo => <TodoComponent key={todo.id} todo={todo} />)}
    </tbody>
  </table>
));
