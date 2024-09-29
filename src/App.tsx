import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { getFilteredTodos } from './helpers/TodoHelper';
import {
  todosFetchError,
  todosFetchStart,
  todosFetchSuccess,
} from './features/todos';
import { getTodos } from './api';
import { StatusTodo } from './types/StatusTodo';

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.data);
  const isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const currentTodo = useSelector((state: RootState) => state.currentTodo.todo);

  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<StatusTodo>(
    StatusTodo.All,
  );

  const getTodosList = useCallback(async () => {
    try {
      dispatch(todosFetchStart());

      const data = await getTodos();

      dispatch(todosFetchSuccess(data));
    } catch (error) {
      dispatch(todosFetchError(`${error}`));
    }
  }, [dispatch]);

  useEffect(() => {
    getTodosList();
  }, [getTodosList]);

  const filteredTodos = getFilteredTodos(todos, selectedStatus, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
