import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../todo-list';
import Button from '../button';
import Spinner from '../spiner';
import ErrorIndicator from '../error-indicator';
import { compose } from '../../utils';
import WithTodosService from '../hoc';
import { fetchTodos, fetchUsers } from '../../actions/action-creaters';
import { selectTodosWithUsers, selectLoading, selectLoaded, selectError } from '../../selectors/selector';
import Sorter from '../sorter/Sorter';

class TodoListPage extends Component {
  render() {
    const {
      loading,
      loaded,
      error,
      todos,
      fetchTodos,
      fetchUsers
    } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (!loaded) {
      return (
        <Button
          text="Load Todos"
          clickAction={() => {
            fetchUsers();
            fetchTodos();
          }}
        />);
    }
    if (error) {
      return <ErrorIndicator/>;
    }
    return (
      <>
        <Sorter/>
        <TodoList todosList={todos}/>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { todos: selectTodosWithUsers(state),
    loading: selectLoading(state),
    loaded: selectLoaded(state),
    error: selectError(state),
  };
};

const mapDispatchToProps = (dispatch, { todosService }) => {
  return {
    fetchTodos: fetchTodos(todosService, dispatch),
    fetchUsers: fetchUsers(todosService, dispatch),
  };
};

export default compose(
  WithTodosService(),
  connect(mapStateToProps, mapDispatchToProps)
)(TodoListPage);
