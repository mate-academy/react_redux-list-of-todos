import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  return (
    <div
      className="item"
      style={props.item.completed
        ? { background: 'rgba(69, 169, 21, 0.15)' }
        : { background: 'rgba(253, 106, 96, 0.29)' }}
    >
      <span className="title">{props.item.title}</span>
      <span className="progress">
        {props.item.completed ? 'Completed' : 'In progress'}
      </span>
      <a
        href="#?"
        className="remove"
        onClick={() => props.remove(props.index)}
      >
        &times;
      </a>
    </div>
  );
}

export default TodoItem;
