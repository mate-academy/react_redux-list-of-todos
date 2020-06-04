import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import User from './User';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, user, completed, title } = todo;

  return (
    <Table.Row
      className="TodoItem"
      positive={completed}
      negative={!completed}
    >
      <Table.Cell>{id}</Table.Cell>
      <User user={user} />
      <Table.Cell textAlign="left">{title}</Table.Cell>
      <Table.Cell content={completed ? 'Complebitur' : 'In processus'} />
      <Table.Cell>
        <Button
          className="TodoItem-Delete"
          onClick={() => console.log(id)}
          color="red"
          icon
        >
          <Icon name="trash alternate" />
          &nbsp;&nbsp;Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default TodoItem;
