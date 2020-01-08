import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button,
  Grid,
  Container,
  Dimmer,
  Loader } from 'semantic-ui-react';
import {
  startLoading,
  handleError,
  handleSuccess,
  sortTodos,
} from './store/store';
import 'semantic-ui-css/semantic.min.css';
import TodoItem from './TodoItem';

function TodoList({
  combineData,
  isLoading,
  hasError,
  startLoading,   // eslint-disable-line
  handleError,   // eslint-disable-line
  handleSuccess,  // eslint-disable-line
  sortTodos,      // eslint-disable-line
}) {
  const loadTodos = async() => {
    startLoading();

    const [
      todosFromServer,
      usersFromServer,

    ] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/todos'),
      axios.get('https://jsonplaceholder.typicode.com/users'),
    ]).catch(() => {
      handleError();
    });

    const combineData = todosFromServer.data.map(todo => ({    // eslint-disable-line
      ...todo,
      user: usersFromServer.data.find(user => user.id === todo.userId),
    }));

    handleSuccess(combineData);
  };

  return (
    <Container className="App">
      {
        (combineData.length > 0)
          && (
          <>
            <Button.Group>
              <Button value="title" onClick={sortTodos}>SORT BY TITLE</Button>
              <Button.Or />
              <Button value="status" onClick={sortTodos}>SORT BY STATUS</Button>
              <Button.Or />
              <Button value="user" onClick={sortTodos}>SORT BY USER</Button>
              <Button>
Now is shown
                {combineData.length}
                {' '}
todos
              </Button>
              <Button onClick={loadTodos}>Reload all todos</Button>
            </Button.Group>
          </>
          )
      }

      {isLoading
      && (
        <Dimmer active>
          <Loader size="huge">LOADING.....</Loader>
        </Dimmer>
      )}
      {hasError
      && (
      <>
        <p>Error</p>
        <Button onClick={loadTodos}>Try Again</Button>
      </>
      )
      }
      {combineData.length === 0 && !hasError
        ? (
          <>
            <p>No todos yet </p>
            <Button
              onClick={loadTodos}
              content="Load"
              icon="right arrow"
              labelPosition="right"
            />
          </>
        )
        : (
          <Grid columns={3} divided>
            <Grid.Row>

              {combineData.map(todo => (
                <Grid.Column key={todo.id}>
                  <TodoItem todo={todo} />
                </Grid.Column>
              ))}

            </Grid.Row>
          </Grid>
        )
      }
    </Container>
  );
}

const mapStateToProps = state => ({
  combineData: state.combineData,
  isLoading: state.isLoading,
  hasError: state.hasError,

});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  handleError: () => dispatch(handleError()),
  handleSuccess: combineData => dispatch(handleSuccess(combineData)),
  sortTodos: event => dispatch(sortTodos(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

TodoList.propTypes = {
  combineData: PropTypes.arrayOf(PropTypes.any).isRequired,
  sortTodos: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  startLoading: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};
