import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <User user={props.user}/>
      <td>{props.completed}</td>
      <td><button className='remove' type="button" onClick={() => props.remove(props.todos, props.index)}>Remove</button></td>
    </tr>
  );
}

TodoItem.propTypes = {
  completed: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default TodoItem;
