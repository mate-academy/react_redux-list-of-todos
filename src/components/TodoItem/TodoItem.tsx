import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getListOfTodos, setTodos, getUserID, setUserID,
} from '../../store';
import { PropState } from '../../utils/types';

export const TodoItem: FC<PropState> = ({ todo }) => {
  const dispatch = useDispatch();
  const todos = useSelector(getListOfTodos);
  const userId = useSelector(getUserID);

  return (
    <>
      <label>
        <input
          type="checkbox"
          readOnly
        />
        <p>{todo.title}</p>
      </label>
      <div className="Button_container">
        { userId === todo.userId ? (
          <button
            type="button"
            className="TodoList__user-button--selected"
            onClick={() => {
              dispatch(setUserID(0));
            }}
          >
            User#
            {todo.userId}
          </button>
        ) : (
          <button
            type="button"
            className="TodoList__user-button--unselected"
            onClick={() => {
              dispatch(setUserID(todo.userId));
            }}
          >
            User#
            {todo.userId}
          </button>
        )}
        <button
          className="TodoList__todo-button"
          onClick={() => {
            dispatch(setTodos(todos.filter(item => item.id !== todo.id)));
          }}
        >
          Remove Todo
        </button>
      </div>
    </>
  );
};
