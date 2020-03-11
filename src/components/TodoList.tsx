import React, { FC } from 'react';
import { connect } from 'react-redux';

import {
  AppState,
  TodoWithUser,
  TodosAction,
} from '../constants/types';
import { getSortedTodos } from '../utils/helpers';
import { deleteTodo } from '../actions/index';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
  deleteTodo(id: number): TodosAction;
}


const TodoListTemplate: FC<Props> = (props) => {
  const {
    todos,
    deleteTodo: deleteTodoActionCreator,
  } = props;

  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          className="todo-item"
        >
          <span>
            <b>Title: </b>
            {todo.title}
          </span>
          <span>
            <b>Name: </b>
            {todo.user.name}
          </span>
          <button
            type="button"
            className="delete-todo-item"
            onClick={() => deleteTodoActionCreator(todo.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    todos: getSortedTodos(state),
  };
};

export const TodoList = connect(
  mapStateToProps,
  { deleteTodo },
)(TodoListTemplate);
