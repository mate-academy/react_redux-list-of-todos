import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { actions as currentTodoActions } from './features/currentTodo';
import { Filter } from './components/enum/Filter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isTodosError, setIsTodosError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const todos = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data: Todo[] = await getTodos();

        dispatch(todosActions.set(data));
      } catch (err) {
        setIsTodosError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTodos = useMemo(() => {
    let todoList = [...todos];

    todoList = todoList.filter(todo => {
      switch (status) {
        case Filter.Completed:
          return todo.completed;

        case Filter.Active:
          return !todo.completed;

        default:
          return todo;
      }
    });

    if (query.trim()) {
      const loweredQuery = query.trim().toLowerCase();

      todoList = todoList.filter(todo => (
        todo.title.toLowerCase().includes(loweredQuery)
      ));
    }

    return todoList;
  }, [todos, status, query]);

  const handleTodoInfo = (id: number, todo: Todo) => {
    setUserId(id);
    dispatch(currentTodoActions.setTodo(todo));
  };

  const handleCloseModal = () => {
    setUserId(0);
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {isLoading
              ? (<Loader />)
              : (
                <div className="block">
                  <TodoList
                    todos={filteredTodos}
                    currentTodo={currentTodo}
                    handleTodoInfo={handleTodoInfo}
                  />
                </div>
              )}

            {isTodosError && (
              <p className="notification is-warning">
                There are no todos on server
              </p>
            )}

            {!filteredTodos.length && query && (
              <p className="notification is-warning">
                There are no todos matching current filter criteria
              </p>
            )}
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal
          userId={userId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
