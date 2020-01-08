import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ item }) => (
  <tr>
    <td>{item.id}</td>
    <td>{item.title}</td>
    <td>{item.completed ? 'Yes' : 'No'}</td>
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
