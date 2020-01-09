import React from 'react';
import PropTypes from 'prop-types';

const ToDoItem = ({ title, name, completed }) => (
  <tr>
    <td className="aligned-left">{title}</td>
    <td>{name}</td>
    <td>{completed ? 'Done' : 'InProgress'}</td>
  </tr>
);

ToDoItem.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default ToDoItem;
