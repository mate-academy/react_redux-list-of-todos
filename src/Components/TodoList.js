import React, { Component } from 'react';
import User from './User';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList(props) {
  if (!props.requestedUsers) {
    return (
      <button
        onClick={() => props.loadUser()}
        type="button"
        className="load"
      >
        Load List of Users
      </button>
    );
  }
  if (props.users === null) {
    return <span>Loading ...</span>;
  } if (!props.requested) {
    return (
      props.users.map(item => (
        <div className="userBlock">
          <User user={item} />
          <button onClick={() => props.loadTodos()} type="button" className="loadTodo">
            Load Todo Items
          </button>
        </div>
      )));
  }
  if (props.todos === null) {
    return <span>Loading ...</span>;
  }
  return (
    props.users.map(user => (
      <div className="userBlock">
        <User user={user} />
        {props.todos.map((item, index) => {
          if (user.id === item.userId) {
            return (
              <TodoItem
                item={item}
                index={index}
                remove={() => props.removeItem(index)}
              />
            );
          }
        })}
      </div>
    ))
  );
}

export default TodoList;
