import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodosSelector } from "../../store";
import { fetchTodos } from "../../store/actions";

import { Todo } from "../Todo/Todo";

import "./TodoList.scss";

export const TodoList = () => {
  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.length > 0
            ? todos.map((todo) => <Todo todo={todo} key={todo.id} />)
            : "No todos"}
        </ul>
      </div>
    </div>
  );
};
