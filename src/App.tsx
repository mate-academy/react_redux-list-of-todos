import "bulma/css/bulma.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Loader, TodoFilter, TodoList, TodoModal } from "./components";
import { useAppSelector } from "./app/store";
import { useEffect } from "react";
import { getTodos } from "./api";
import { Todo } from "./types/Todo";
import { useDispatch } from "react-redux";
import { todosSlice } from "./features/todos";

export const App = () => {
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const todos = useAppSelector((state) => state.todos);
  const dispatch = useDispatch();

  const getTodosStore = (todo: Todo[]) =>
    dispatch(todosSlice.actions.getTodosStore(todo));

  useEffect(() => {
    async function loadTodos() {
      const data = await getTodos();

      getTodosStore(data);
    }

    loadTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {todos.length !== 0 ? <TodoList /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
