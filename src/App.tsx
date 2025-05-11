import { useEffect, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { StatusEnum } from './constants/StatusEnum';

export const App = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();

        dispatch(todosSlice.actions.addTodos(data));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterTodos = () => {
    let filteredTodo = todos.filter(todoList =>
      todoList.title.toLowerCase().includes(filter.query.trim().toLowerCase()),
    );

    if (filter.status === StatusEnum.Completed) {
      filteredTodo = filteredTodo.filter(
        todoList => todoList.completed === true,
      );
    }

    if (filter.status === StatusEnum.Active) {
      filteredTodo = filteredTodo.filter(
        todoList => todoList.completed === false,
      );
    }

    return filteredTodo;
  };

  const filteredTodos = filterTodos();

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
              {isLoading && <Loader />}
              {!isLoading && todos && (
                <TodoList filteredTodos={filteredTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
