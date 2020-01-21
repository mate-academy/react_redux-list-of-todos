import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ dataFromServer }) {
  return (
    <div className="todos-list">
      {dataFromServer.map(item => <TodoItem todo={item} key={item.id} />)}
    </div>
  );
}

TodoList.propTypes = {
  dataFromServer: PropTypes.arrayOf().isRequired,
};

export default TodoList;
