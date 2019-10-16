import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

const useLink = (init) => {
  const [value, set] = useState(init);

  return { value, set };
};

const TodoList = ({ todos }) => {
  const $todos = useLink(todos);

  return (
    <div className="todolist">
      {$todos.value.map((todo) => <TodoItem key={todo.id} {...todo} />)}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any).isRequired,
  filterPattern: PropTypes.string.isRequired,
};

export default connect(({ todos, filterPattern }) => ({
  todos: todos.sort((a, b) => {
    if (a[filterPattern] > b[filterPattern]) {
      return 1;
    }

    if (a[filterPattern] < b[filterPattern]) {
      return -1;
    }

    if (a.id > b.id) {
      return 1;
    }

    if (a.id < b.id) {
      return -1;
    }
    return 0;
  }),
  filterPattern,
}))(TodoList);
