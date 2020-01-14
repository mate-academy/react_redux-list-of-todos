import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import TodoItem from './TodoItem';
import { getFullTodos, getSortingTitle, titles } from './store';

const TodoList = ({ fullTodos, sortingTitle, setSortBy, removeTodo }) => (
  <table className="todo-list__table">
    <thead>
      <tr>
        {titles.map((title) => {
          switch (title) {
            case 'remove':
              return (
                <th
                  key={title}
                  className="table__heading"
                >
                  {title.toUpperCase()}
                </th>
              );
            default:
              return (
                <th
                  key={title}
                  onClick={() => setSortBy(title)}
                  className={cn(
                    'table__heading',
                    'table__heading--sortable',
                    { 'table__heading--selected': title === sortingTitle }
                  )}
                >
                  {title.toUpperCase()}
                </th>
              );
          }
        })}
      </tr>
    </thead>
    <tbody>
      {fullTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  fullTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  sortingTitle: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  fullTodos: getFullTodos(state),
  sortingTitle: getSortingTitle(state),
});

export default connect(mapStateToProps)(TodoList);
