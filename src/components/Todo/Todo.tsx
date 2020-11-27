import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getTodoId } from "../../store";
import { updateUserID, updateTodoId } from "../../store/actions";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const Todo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { id, title, userId, completed } = todo;
  const activeTodo = useSelector(getTodoId);
  const dispatch = useDispatch();

  return (
    <li
      className={`TodoList__item ${
        completed ? "TodoList__item--checked" : "TodoList__item--unchecked"
      }`}
      key={id}
    >
      <label>
        <input type="checkbox" checked={completed} readOnly />
        <p>{title}</p>
      </label>

      <button
        className={cn(
          "TodoList__user-button",
          { "TodoList__user-button--selected": activeTodo === id },
          "button"
        )}
        type="button"
        onClick={() => {
          dispatch(updateTodoId(id));
          dispatch(updateUserID(userId));
        }}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
};
