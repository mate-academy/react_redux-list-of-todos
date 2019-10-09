import React from 'react';
import './TodoItem.css';

import { Users } from '../User/User';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo }) => (
  <div className="card" style={{ width: '18rem'}}>
    <h3 className="task">{ todo.title }</h3>
    <Users {...todo.user} />
    <h6 className="card-subtitle mb-2 text-muted">
      { todo.completed ? '\u2714' : '\u2718' }
    </h6>
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
