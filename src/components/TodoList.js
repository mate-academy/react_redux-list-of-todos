import React, { useEffect } from 'react';
import {
  Button,
  Dimmer,
  Loader,
  Message,
  Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Todo from './Todo';
import { TODOS_TEXT } from '../text';
import { loadTodos } from '../actions/actions';

const joinTodos = (todos, users) => todos.map((todo) => {
  const newTodo = {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    user: users.find(user => user.id === todo.userId).name,
  };

  return newTodo;
});

const TodoList = ({ todos, users, error, loadTodos }) => {
  useEffect(() => {
    loadTodos();
  }, []);

  if (error) {
    return (
      <Message negative className="error-area">
        <Message.Header>{error}</Message.Header>
        <Button
          negative
          onClick={loadTodos}
          className="error-button"
        >
          {TODOS_TEXT.RETRY_LOADING}
        </Button>
      </Message>
    );
  }

  if (todos && users) {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>N</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Completeness</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {joinTodos(todos, users).map((todo, index) => (
            <Todo
              todo={todo}
              index={index}
              key={todo.id}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }

  return (
    <Dimmer active inverted>
      <Loader size="big" inverted>Loading</Loader>
    </Dimmer>
  );
};

export default connect(state => ({
  todos: state.todoList,
  users: state.userList,
  error: state.loadingError,
}), dispatch => ({ loadTodos: () => dispatch(loadTodos()) }))(TodoList);
