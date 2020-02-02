import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  todosURL,
  ACTION_TYPES,
  todoDelete,
  sortTodos,
} from './components/redux/Actions';
import {
  selectIsLoading,
  selectList,
  selectListError,
} from './components/redux/Selectors';
import TodoList from './components/TodoList';
import Buttons from './components/Buttons';
import { TodosContext, ForButtonsContext } from './context';
import './App.css';

const App = ({
  isLoading,
  error,
  preparedTodos,
  loadData,
  deleteTodo,
  switcher,
}) => {
  if (isLoading) {
    return <p>loading...</p>;
  }

  if (error) {
    return (
      <>
        <p>Error occurred!!!</p>
        <Button
          type="button"
          onClick={() => loadData(true)}
        >
            Try Again!
        </Button>
      </>
    );
  }

  if (!preparedTodos) {
    return (
      <>
        <p>No users and todos yet!</p>
        <Button type="button" onClick={() => loadData(true)} color="green">
            Load
        </Button>
      </>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <ForButtonsContext.Provider value={{
        switcher, loadData,
      }}
      >
        <Buttons />
      </ForButtonsContext.Provider>

      <TodosContext.Provider value={{
        preparedTodos, deleteTodo,
      }}
      >
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
};

function mapState2Props(state) {
  return {
    preparedTodos: selectList(state),
    error: selectListError(state),
    isLoading: selectIsLoading(state),
  };
}

const mapDispatch2Props = dispatch => ({
  loadData: () => dispatch(todosURL()),
  stopLoading: isLoading => dispatch({
    type: ACTION_TYPES.STOP_LOADING,
    isLoading,
  }),
  deleteTodo: todoId => dispatch(todoDelete(todoId)),
  switcher: sorter => dispatch(sortTodos(sorter)),
});

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export { Enhanced as App };

App.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  preparedTodos: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  switcher: PropTypes.func.isRequired,
};

App.defaultProps = {
  preparedTodos: [],
  error: false,
  isLoading: false,
};
