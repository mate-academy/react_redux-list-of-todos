import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';

const useLink = (init) => {
  const [value, set] = useState(init);

  return { value, set };
};

const TodoList = ({ todos, filterPattern }) => {
  const $todos = useLink(todos);
  const $pattern = useLink(filterPattern);

  useEffect(() => {

    if (filterPattern === '') {
      $todos.set(todos);
    } else {
      $todos.set(todos.sort((a, b) => {
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
      }));
      $pattern.set(filterPattern);
    }
  });

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
  todos,
  filterPattern,
}))(TodoList);
