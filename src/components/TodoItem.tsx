import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Table } from 'semantic-ui-react';
import { deleteTodo } from '../store/todos';
import User from './User';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, user, completed, title } = todo;
  const dispatch = useDispatch();

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
          onClick={() => dispatch(deleteTodo(id))}
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
