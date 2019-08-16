import React from 'react';
import { connect } from 'react-redux'

const getData = (state) => ({
  todos: state.todos,
})

const getMethods = (dispatch) => ({
  sortByName: () => dispatch({ type: 'SORT_BY_NAME' }),
  sortByTitle: () => dispatch({ type: 'SORT_BY_TITLE' }),
  sortByComplited: () => dispatch({ type: 'SORT_BY_COMPLITED' }),
  handleDelit: (value) => dispatch({
    type: 'DELETE_TODO',
    value: value,
  })
})

const  TodosList = ({ todos, sortByName, sortByTitle, sortByComplited, handleDelit }) => (
  <div>
   <div className='sort-buttons'>
   <button
      onClick={sortByName}
      className='sort-button'
    >
      sort by name
    </button>
    <button
      onClick={sortByTitle}
      className='sort-button'
    >
      sort by title
    </button>
    <button
      onClick={sortByComplited}
      className='sort-button'
    >
      sort by complited
    </button>

   </div>
    {todos.map(todo => (
      <ul key={todo.id} className='todos-list'>
        <li className="todos-list_name">{todo.user.name} </li>
        <li className="todos-list_title">{todo.title}</li>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
          />
        <li
          className='todos-list_delet-todo'
          onClick={() => handleDelit(todo.id)}
        >Delete Todo
        </li>
      </ul>
    ))}
  </div>
)

export default connect(
  getData,
  getMethods
)(TodosList);
