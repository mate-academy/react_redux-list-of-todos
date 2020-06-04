import React from 'react';
import { Table } from 'semantic-ui-react';
import User from './User';
import TodoCellCompleted from './TodoCellCompleted';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => (
  <Table.Row warning>
    <Table.Cell>{todo.id}</Table.Cell>
    <User user={todo.user} />
    <Table.Cell textAlign="left">{todo.title}</Table.Cell>
    <TodoCellCompleted compl={todo.completed} />
  </Table.Row>
);

export default TodoItem;
