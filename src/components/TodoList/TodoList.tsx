import React from 'react';
import { Todo } from '../../types/Todo';
import { TableRow } from '../TableComponent/TableRow';

type Props = {
  todos: Todo[];
  errorUser: string;
  onOpenModal: (userId: number, todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onOpenModal,
  errorUser,
}) => (
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
      {todos.map(todo => (
        <TableRow
          errorUser={errorUser}
          todo={todo}
          // id={todo.id}
          // title={todo.title}
          // completed={todo.completed}
          // userId={todo.userId}
          key={todo.id}
          onOpenModal={onOpenModal}
        />
      ))}
    </tbody>
  </table>
);
