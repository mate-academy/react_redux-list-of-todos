import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import { getTodos } from '../../store';

const TodoList = ({ todos }) => (
  <ul className="list-group">
    {todos.map(item => <TodoItem todo={item} key={item.id} />)}
  </ul>
);

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape).isRequired,
};

const getData = state => ({
  todos: getTodos(state),
});

export default connect(
  getData
)(TodoList);
