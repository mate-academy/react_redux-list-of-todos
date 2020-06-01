
import React from 'react';
import { WithUserTodo, RootState } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const TodoTemplate = ({
  todo,
  setWithUserTodos,
  withUserTodos
}: {
  todo: WithUserTodo
  setWithUserTodos: (withUserTodos: WithUserTodo[]) => void;
  withUserTodos: WithUserTodo[];
}) => {
  return (
    <div className="Todo">
      <p><strong>Todo:</strong>{todo.title}</p>
      <p>
        <strong>
          Is completed:
          </strong>
        {todo.completed ? "Uncompleted" : "Completed"}
      </p>
      <p><strong>User name: </strong>{todo.user.name}</p>
      <button
        onClick={() => {
          setWithUserTodos(withUserTodos
            .filter((item: WithUserTodo) => item.id !== todo.id)
          )
        }}
        className="Todo__button"
      >Delete</button>
    </div>
  )
}

const mapDispatch = (dispatch: Dispatch) => ({
  setWithUserTodos: (withUserTodos: WithUserTodo[]) => dispatch({
    type: 'SET_WITH_USER_TODOS',
    withUserTodos
  })
})

const mapState = (state: RootState) => ({
  withUserTodos: state.withUserTodos,
})

export const Todo = connect(mapState, mapDispatch)(TodoTemplate)
