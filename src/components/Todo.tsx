
import React from 'react';
import { CustomTodo, RootState } from '../types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const TodoTemplate = ({
  todo,
  setCustomTodos,
  customTodos
}: {
  todo: CustomTodo
  setCustomTodos: (customTodos: CustomTodo[]) => void;
  customTodos: CustomTodo[];
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
          setCustomTodos(customTodos.filter((item: CustomTodo) => item.id !== todo.id))
        }}
        className="Todo__button"
      >Delete</button>
    </div>
  )
}

const mapDispatch = (dispatch: Dispatch) => ({
  setCustomTodos: (customTodos: CustomTodo[]) => dispatch({
    type: 'SET_CUSTOM_TODOS',
    customTodos
  })
})

const mapState = (state: RootState) => ({
  customTodos: state.customTodos,
})

export default connect(mapState, mapDispatch)(TodoTemplate)
