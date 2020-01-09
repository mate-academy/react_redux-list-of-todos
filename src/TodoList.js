import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Main.css';
import TodoItem from './TodoItem';
import {
  loadPreparedTodos,
  getIsloading,
  getisShown,
  getTodosWithUsers,
  sortByType,

} from './store';

const TodoList = ({
  isLoading,
  isShown,
  visibleTodos,
  loadTodosWithUsers,
  sortTodosBy,

}) => {
  const getPreparedTodos = async() => {
    await loadTodosWithUsers();
  };
  const sortList = ['id', 'title', 'status', 'user', 'delete'];

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {
        isShown ? (
          <button
            className="button button--init"
            type="button"
            onClick={() => {
              getPreparedTodos();
            }}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  {sortList.map(sort => (
                    sort !== 'delete' ? (
                      <th
                        onClick={() => sortTodosBy(sort)}
                        key={sort}
                      >
                        {sort}
                      </th>
                    ) : (
                      <th
                        key={sort}
                      >
                        {sort}
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleTodos.map(todo => (
                  <TodoItem
                    todo={todo}
                    key={todo.id}
                  />
                ))}
              </tbody>

            </table>
          </>
        )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: getIsloading(state),
  isShown: getisShown(state),
  visibleTodos: getTodosWithUsers(state),
});

const mapDispatchToProps = dispatch => ({
  loadTodosWithUsers: () => dispatch(loadPreparedTodos()),
  sortTodosBy: title => dispatch(sortByType(title)),

});

TodoList.propTypes = {
  isShown: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadTodosWithUsers: PropTypes.func.isRequired,
  sortTodosBy: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
