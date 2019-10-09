import React from 'react';
import TodoItem from '../../containers/TodoItem/TodoItem';
import './TodosList.scss';

class TodoList extends React.Component {
  state = {
    activeFilter: 'origin',
  }

  handleChange = (event) => {
    this.setState({ activeFilter: event.target.value });
  }

  render() {
    const { preparedTodos, isLoading, hasError } = this.props;
    const { activeFilter } = this.state;
    let filteredTodos = preparedTodos;

    if (isLoading) {
      return (
        <>
          <p>Loading...</p>
          <button onClick={this.props.loadTodosUsers}>Load</button>
        </>
      );
    }
    if (hasError) {
      return (
        <>
          <p>Error occurred!!!</p>
        </>
      );
    }
    if (preparedTodos.length === 0) {
      return (
        <>
          <p>No users yet</p>
          <button onClick={this.props.loadTodosAndUsers}>Load</button>
        </>
      );
    }

    if (activeFilter === 'name') {
      filteredTodos = preparedTodos.sort((a, b) => {
        if (a.user.username < b.user.username) { return -1; }
        if (a.user.username > b.user.username) { return 1; }
        return 0;
      });
    }
    if (activeFilter === 'title') {
      filteredTodos = preparedTodos.sort((a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      });
    }
    if (activeFilter === 'status') {
      filteredTodos = preparedTodos.sort((a, b) => {
        if (a.completed < b.completed) { return -1; }
        if (a.completed > b.completed) { return 1; }
        return 0;
      });
    }
    if (activeFilter === 'origin') {
      filteredTodos = preparedTodos.sort((a, b) => {
        if (a.id < b.id) { return -1; }
        if (a.id > b.id) { return 1; }
        return 0;
      });
    }

    return (
      <div className="todos">
        <div className="todos__sort">
          <form className="todos__sort-form" id="sort-form">
            <p>Select by:</p>
            <select value={this.state.activeFilter} onChange={this.handleChange} name="sort-list" form="sort-form">
              <option value="origin">origin</option>
              <option value="name">name</option>
              <option value="title">title</option>
              <option value="status">item status</option>
            </select>
          </form>
        </div>
        {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </div>
    );
  }
}

export default TodoList;
