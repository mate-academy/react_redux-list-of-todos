
import React from 'react';
import { connect } from 'react-redux';
import { getSortedTodos } from '../store';
import { RootState, WithUserTodo } from '../types';
import { Todo } from './Todo';
import { Dispatch } from 'redux';

const Todos = ({
  sortField,
  setSortField,
  sortedTodos
}: {
  sortField: string;
  setSortField: (sortField: string) => Object;
  sortedTodos: WithUserTodo[]
}) => {

  return (
    <>
      <span>Sort type:  </span>
      <select
        value={sortField}
        onChange={(event) => {
          setSortField(event.target.value)
        }}
      >
        <option value="Title">Title</option>
        <option value="UserName">UserName</option>
        <option value="Completed">Completed</option>
      </select>
      <ul>
        {sortedTodos.map((todo: WithUserTodo) => (
          <li>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  sortedTodos: getSortedTodos(state),
  sortField: state.sortField,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSortField: (sortField: string) => {
    return dispatch({ type: 'SET_SORT_FIELD', sortField })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
