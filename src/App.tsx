/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { todosAction } from './features/todos';
import { currentTodoActions } from './features/currentTodo';
import { filterActions } from './features/filter';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [openTodo, setOpenTodo] = useState<boolean>(false);
  const [crossClicked, setCrossClicked] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    const fetchData = async () => {
      const todosFromServer = await getTodos();

      dispatch(todosAction.setTodos(todosFromServer));
    };

    fetchData();
  }, []);

  const onChosenFilter = (data: Status) => {
    dispatch(filterActions.setStatus(data));
  };

  const onQuery = (data: string) => {
    dispatch(filterActions.setQuery(data));
  };

  const onChosenTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
    setOpenTodo(true);
    setCrossClicked(true);
  };

  const todoModalClick = () => {
    setOpenTodo(false);
    setCrossClicked(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChosenFilter={onChosenFilter}
                onQuery={onQuery}
                query={query}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todos}
                    filter={status}
                    query={query}
                    onChosenTodo={onChosenTodo}
                    crossClicked={crossClicked}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && openTodo && (
        <TodoModal
          todo={selectedTodo}
          handleDeleteClick={todoModalClick}
        />
      )}
    </>
  );
};
