import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import getFilteredTodos from './utils/getFilteredTodos';
import { setCurrentTodo } from './features/currentTodo';
import { Todo } from './types/Todo';
import useFetch from './utils/hooks/useFetch';
import { normalizedCase } from './utils/normalizedCase';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();

  const { data, isLoading } = useFetch<Todo[]>(() => getTodos());

  useEffect(() => {
    if (data) {
      dispatch(setTodos({ todos: data }));
    }
  }, [data, dispatch]);

  const filteredTodos = useMemo(() => {
    if (status) {
      const filterTodo = getFilteredTodos(todos, status);

      if (normalizedCase(query)) {
        return filterTodo.filter(todo =>
          normalizedCase(todo.title).includes(normalizedCase(query)),
        );
      }

      return filterTodo;
    }

    if (normalizedCase(query)) {
      return todos.filter(todo =>
        normalizedCase(todo.title).includes(normalizedCase(query)),
      );
    }

    return todos;
  }, [todos, query, status]);

  const handleChangeCurrentTodo = useCallback(
    (todo: Todo) => {
      dispatch(setCurrentTodo(todo));
    },
    [dispatch],
  );

  const handleResetCurrentTodo = useCallback(() => {
    dispatch(setCurrentTodo(null));
  }, [dispatch]);

  const isModalOpen = !!currentTodo;

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
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={currentTodo?.id}
                  onSelect={handleChangeCurrentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal todo={currentTodo} onClose={handleResetCurrentTodo} />
      )}
    </>
  );
};
