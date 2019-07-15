import React, { Component } from 'react';
import TodoItemHandler from './TodoItemHandler';

export default class TodoList extends Component {
  render() {
    if (!this.props.request) {
      return <button className="loadButton" onClick={this.props.loadTodos}>load</button>
    } else if (this.props.request && this.props.listTodos !== null) {
      return (
        <table>
          <thead>
            <tr>
              <th className="noselect" onClick={() => this.props.sort('title')}>Title</th>
              <th className="noselect" onClick={() => this.props.sort('author')}>User</th>   
              <th className="noselect" onClick={() => this.props.sort('completed')}>Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.listTodos.map(todo => {
              console.log(todo)
              return <TodoItemHandler todo={todo} index={todo.id}key={todo.id}/>
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

