import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { setTodos } from './features/todos';
import getFiltredTodos from './utils/getFilteredTodos';
import { setCurrentTodo } from './features/currentTodo';
import { Todo } from './types/Todo';
import useFetch from './utils/hooks/useFetch';
import { normilizedCase } from './utils/normilizedCase';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const disptach = useAppDispatch();

  const { data, isLoading } = useFetch<Todo[]>(() => getTodos());

  useEffect(() => {
    if (data) {
      disptach(setTodos({ todos: data }));
    }
  }, [data, disptach]);

  const filteredTodos = useMemo(() => {
    if (status) {
      const filterTodo = getFiltredTodos(todos, status);

      if (normilizedCase(query)) {
        return filterTodo.filter(todo =>
          normilizedCase(todo.title).includes(normilizedCase(query)),
        );
      }

      return filterTodo;
    }

    if (normilizedCase(query)) {
      return todos.filter(todo =>
        normilizedCase(todo.title).includes(normilizedCase(query)),
      );
    }

    return todos;
  }, [todos, query, status]);

  const handleChangeCurrentTodo = useCallback(
    (todo: Todo) => {
      disptach(setCurrentTodo(todo));
    },
    [disptach],
  );

  const handleResetCurrentTodo = useCallback(() => {
    disptach(setCurrentTodo(null));
  }, [disptach]);

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
