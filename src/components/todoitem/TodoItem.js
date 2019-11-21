import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import User from '../user/User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.title}</td>
    <User user={todo.user} />
    {todo.completed ? (
      <Table.Cell positive>
        Completed
      </Table.Cell>
    ) : (
      <Table.Cell negative>
        In progress
      </Table.Cell>
    )
    }
  </tr>
);

export default TodoItem;

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number,
    user: PropTypes.object,
  }).isRequired,
};
