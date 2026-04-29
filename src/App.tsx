import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { currentTodoSlice } from './features/currentTodo';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { todosSlice } from './features/todos';
import { useEffect, useMemo, useState } from 'react';
import { filterSlice } from './features/filter';
import { Status } from './types/Status';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);

  const [isLoading, setIsLoading] = useState(true);

  const closeModalCard = () => {
    dispatch(currentTodoSlice.actions.removeCurrentTodo());
  };

  const openModalCard = (value: Todo) => {
    dispatch(currentTodoSlice.actions.addCurrentTodo(value));
  };

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.changeStatus(event.target.value as Status));
  };

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.changeQuery(event.target.value));
  };

  const deleteQuery = () => {
    dispatch(filterSlice.actions.clearQuery());
  };

  const correctTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter],
  );

  useEffect(() => {
    getTodos()
      .then(response => {
        dispatch(todosSlice.actions.addTodos(response));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                handleStatus={handleStatus}
                changeQuery={changeQuery}
                deleteQuery={deleteQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  isLoading={isLoading}
                  todos={correctTodos}
                  currentTodo={currentTodo}
                  openModalCard={openModalCard}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal todo={currentTodo} closeModalCard={closeModalCard} />
      )}
    </>
  );
};
