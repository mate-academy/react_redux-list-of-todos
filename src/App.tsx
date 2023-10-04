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
import { Filter } from './types/Filter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data: Todo[] = await getTodos();

        dispatch(todosActions.set(data));
      } catch (err) {
        setHasError(true);
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

    const queryNormalized = query.trim().toLowerCase() || '';

    if (queryNormalized) {
      todoList = todoList.filter(todo => (
        todo.title.toLowerCase().includes(queryNormalized)
      ));
    }

    return todoList;
  }, [todos, status, query]);

  const getTodoInfo = (id: number, todo: Todo) => {
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
                    getTodoInfo={getTodoInfo}
                  />
                </div>
              )}

            {hasError && (
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
