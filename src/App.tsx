/* eslint-disable max-len */
import React, {
  useEffect,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { Todo } from './types/Todo';
import { FilterStatus } from './enums';
import { getTodos } from './features/todos';
import { removeTodo } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const defaultDispatch = useDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const isLoading = useAppSelector(state => state.todos.isLoading);
  const filterStatus = useAppSelector(state => state.filter.status);
  const searchQuery = useAppSelector(state => state.filter.query);
  const { todo: selectedTodo } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    defaultDispatch(getTodos());
  }, [dispatch]);

  const visibleTodos = () => {
    const preparedTodos = filterStatus === FilterStatus.ALL
      ? todos
      : todos.filter(todo => {
        if (filterStatus === FilterStatus.ACTIVE) {
          return !todo.completed;
        }

        return todo.completed;
      });

    if (searchQuery) {
      return preparedTodos.filter(todo => (
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }

    return preparedTodos;
  };

  const clearSelectedTodo = () => defaultDispatch(removeTodo());

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
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos()}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={clearSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};
