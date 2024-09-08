import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { todosFetched, todosFetchError, todosFetching } from './features/todos';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import { useAppSelector } from './hooks/useAppSelector';
import { createSelector } from '@reduxjs/toolkit';
import { getFilteredList } from './helpers/getFilteredList';
import { RootState } from './app/store';
import { Todo } from './types/Todo';

export const App = () => {
  const filteredTodoSelector = createSelector(
    [
      (state: RootState) => state.todos.todos,
      (state: RootState) => state.filter.query,
      (state: RootState) => state.filter.status,
    ],
    (todos, query, status) => getFilteredList(todos, query, status),
  );

  const filteredTodos = useAppSelector<Todo[]>(filteredTodoSelector);
  const { todosLoadingStatus } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const getTodosList = async () => {
    try {
      dispatch(todosFetching());
      const data = await getTodos();

      dispatch(todosFetched(data));
    } catch (error) {
      dispatch(todosFetchError());
      throw error;
    }
  };

  useEffect(() => {
    getTodosList();
  }, []);

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
              {todosLoadingStatus === 'loading' ? (
                <Loader />
              ) : (
                <TodoList todosList={filteredTodos as Todo[]} />
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
