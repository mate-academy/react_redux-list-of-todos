import { FC } from 'react';
import { Todo } from '../../types';
import { TableRow } from '../TableRow';

type Props = {
  todos: Todo[];
};

export const TodosTable: FC<Props> = ({ todos }) => (
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
      {todos.map((todo) => (
        <TableRow key={todo.id} todo={todo} />
      ))}
    </tbody>
  </table>
);
