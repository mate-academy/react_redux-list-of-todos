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
  sortByTitle,
  sortByUser,
  sortById,
  sortByStatus,
} from './store';

const TodoList = ({
  isLoading,
  isShown,
  filteredTodos,
  loadTodosWithUsers,
  sortTitle,
  sortUser,
  sortId,
  sortStatus,
}) => {
  const getPreparedTodos = async() => {
    await loadTodosWithUsers();
  };
  const sortList = [
    {
      title: 'id', callback: sortId,
    },
    {
      title: 'title', callback: sortTitle,
    },
    {
      title: 'status', callback: sortStatus,
    },
    {
      title: 'user', callback: sortUser,
    },
    {
      title: 'delete',
    },
  ];

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
                    sort.title !== 'delete' ? (
                      <th
                        onClick={() => sort.callback(sort.title)}
                        key={sort.title}
                      >
                        {sort.title}
                      </th>
                    ) : (
                      <th
                        key={sort.title}
                      >
                        {sort.title}
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTodos.map(todo => (
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
  filteredTodos: getTodosWithUsers(state),
});

const mapDispatchToProps = dispatch => ({
  loadTodosWithUsers: () => dispatch(loadPreparedTodos()),
  sortTitle: title => dispatch(sortByTitle(title)),
  sortUser: title => dispatch(sortByUser(title)),
  sortId: title => dispatch(sortById(title)),
  sortStatus: title => dispatch(sortByStatus(title)),
});

TodoList.propTypes = {
  isShown: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filteredTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadTodosWithUsers: PropTypes.func.isRequired,
  sortTitle: PropTypes.func.isRequired,
  sortUser: PropTypes.func.isRequired,
  sortId: PropTypes.func.isRequired,
  sortStatus: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
