import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions/actions';

const Todo = ({ todo, index, closeTodo }) => {
  const num = index + 1;

  return (
    <Table.Row
      key={todo.id}
      className={todo.completed ? 'positive' : 'warning'}
    >
      <Table.Cell>{num}</Table.Cell>
      <Table.Cell>{todo.title}</Table.Cell>
      <Table.Cell>{todo.user}</Table.Cell>
      <Table.Cell>
        <span className="cell-icon">
          {todo.completed ? 'Completed' : 'In progress'}
        </span>
        <Icon
          name="close"
          onClick={() => closeTodo(todo.id)}
          style={
            todo.completed ? { display: 'inline-block' } : { display: 'none' }
          }
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default connect(state => ({
  editItem: state.editItem,
}), dispatch => ({ closeTodo: (id) => dispatch(deleteTodo(id)) }))(Todo);
