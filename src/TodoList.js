import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (

  <table className="ui selectable inverted table">
    <tbody className="tbody">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
        />
      ))}
    </tbody>
  </table>

);

TodoList.propTypes = {
  todos: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default TodoList;
