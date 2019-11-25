import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import { Button } from 'semantic-ui-react';
import TodoList from '../table/TodoList';

const App = ({
  todosWithUsers,
  isLoading,
  hasError,
  sortTodos,
  getData,
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasError) {
    return (
      <>
        <p>Loading failed</p>
        <Button type="button" onClick={getData}>Retry</Button>
      </>
    );
  }

  if (!todosWithUsers.length) {
    return <Button type="button" onClick={getData}>Load</Button>;
  }

  return (
    <TodoList
      todos={todosWithUsers}
      sort={sortTodos}
    />
  );
};

App.propTypes = {
  sortTodos: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  todosWithUsers: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

export default App;
