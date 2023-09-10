import React from "react";
import classNames from "classnames";

import { useDispatch } from "react-redux";
import { Todo } from "../../types/Todo";
import { actions as currentTodoAction } from "../../features/currentTodo";
import { useAppSelector } from "../../app/hooks";

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;
  const dispatch = useDispatch();
  const currentTodo = useAppSelector((state) => state.currentTodo);

  return (
    <tr data-cy="todo" key={id}>
      <td className="is-vcentered">{id}</td>
      {completed ? (
        <td className="is-vcentered">
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        </td>
      ) : (
        <td className="is-vcentered" />
      )}
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            "has-text-danger": !completed,
            "has-text-success": completed,
          })}
        >
          {title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => dispatch(currentTodoAction.setTodo(todo))}
        >
          <span className="icon">
            <i
              className={
                id === currentTodo?.id ? "far fa-eye-slash" : "far fa-eye"
              }
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
