import React, { Component } from 'react';
import TodoItemHandler from './TodoItemHandler';

export default class TodoList extends Component {

  render() {
    if (!this.props.request) {
      return <button className="loadItemButton" onClick={this.props.loadTodos}>load</button>
    } else if (this.props.request && this.props.listTodos !== null) {
      return (
        <table>
          <thead>
            <tr>
              <th onClick={() => this.props.sort('author')}>Author</th>
              <th onClick={() => this.props.sort('email')}>Author Email</th>
              <th onClick={() => this.props.sort('title')}>Title</th>
              <th onClick={() => this.props.sort('completed')}>Completed</th>
              <th onClick={this.props.clearAll} className="clearAll">Clear List</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listTodos.map(todo => {
              return <TodoItemHandler selectedTodo={todo} key={todo.id}/>
            })}
          </tbody>
        </table>
      )
    } else {
      return (
      <div className="loading">loading</div>
      )
    }
  };
};

