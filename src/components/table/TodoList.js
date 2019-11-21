import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';
import TodoItem from '../todoitem/TodoItem';

const TodoList = ({ todos, sort }) => (
  <>
    <Button
      type="button"
      onClick={() => sort()}
    >
      Sort by title
    </Button>
    <Button
      type="button"
      onClick={() => sort('userName')}
    >
      Sort by name
    </Button>
    <Button
      type="button"
      onClick={() => sort('completed')}
    >
      Sort by completed
    </Button>

    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Todo</Table.HeaderCell>
          <Table.HeaderCell>User email</Table.HeaderCell>
          <Table.HeaderCell>Is completed</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {todos.map(todo => (
          <TodoItem todo={todo} key={todo.id} />
        ))
        }
      </Table.Body>
    </Table>
  </>
);

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sort: PropTypes.func.isRequired,
};
