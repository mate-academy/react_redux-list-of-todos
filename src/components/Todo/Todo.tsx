import React from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getTodoId } from "../../store";
import { updateUserID, updateTodoId, clear } from "../../store/actions";

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
      className={cn(
        "TodoList__item ",
        { "TodoList__item--checked": completed },
        { "TodoList__item--unchecked": !completed }
      )}
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
          if (id === activeTodo) {
            dispatch(clear());
            return;
          }

          dispatch(updateTodoId(id));
          dispatch(updateUserID(userId));
        }}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
};
