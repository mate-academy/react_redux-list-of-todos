import React from 'react';
import PropTypes from 'prop-types';
import '../index.css';

const TodoItem = ({ item }) => (
  <tr>
    <td>{item.id}</td>
    <td>{item.title}</td>
    <td>{item.completed ? 'Completed' : 'Not Completed'}</td>
    <td>{item.user.name}</td>
  </tr>
);

TodoItem.propTypes = { item: PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
}).isRequired };

export default TodoItem;
