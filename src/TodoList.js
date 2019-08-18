import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = ({ data, handleTodoDelete }) => (
<div className="todolist-table">
  {data.map(element => (
    <TodoItem
      key={Math.random()}
      todoData={element}
      handleTodoDelete={handleTodoDelete}
    />
  ))}
</div>
);
TodoList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
