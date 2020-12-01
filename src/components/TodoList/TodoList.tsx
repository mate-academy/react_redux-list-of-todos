import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodosSelector } from "../../store";
import { fetchTodos } from "../../store/actions";
import { Options } from "../../Interfaces";

import { Todo } from "../Todo/Todo";

import "./TodoList.scss";

export const TodoList = React.memo(() => {
  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("all");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const list = useMemo(() => {
    if (todos) {
      let todoCopy = [...todos];

      if (selected === "active") {
        todoCopy = todoCopy.filter((todo) => todo.title && !todo.completed);
      }

      if (selected === "completed") {
        todoCopy = todoCopy.filter((todo) => todo.title && todo.completed);
      }

      return todoCopy.filter(
        (todo) => todo.title && todo.title.includes(search)
      );
    }

    return [];
  }, [todos, selected, search]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        name="select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {Object.values(Options).map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {list.length > 0
            ? list.map((todo) => <Todo todo={todo} key={todo.id} />)
            : "No todos"}
        </ul>
      </div>
    </div>
  );
});
