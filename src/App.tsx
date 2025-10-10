import { useEffect, useState } from 'react';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { setQuery, setStatus } from './features/filter';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setTodos } from './features/todos';
import { clearCurrentTodo, setCurrentTodo } from './features/currentTodo';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { query, status } = useAppSelector(state => state.filter);

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);

    async function getTodoData() {
      try {
        const todoData = await getTodos();

        if (!isCancelled) {
          dispatch(setTodos(todoData));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error((error as Error).message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    getTodoData();

    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  function handleCloseModal(todoItem?: Todo) {
    if (todoItem) {
      dispatch(setCurrentTodo(todoItem));
    } else {
      dispatch(clearCurrentTodo());
    }
  }

  const todosArray: Todo[] = Array.isArray(todos) ? todos : [];

  const filteredTodos = todosArray.filter((todo: Todo) => {
    const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());
    const optionFilter =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return queryFilter && optionFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={value => dispatch(setQuery(value))}
                option={status}
                setOption={value => dispatch(setStatus(value))}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  isLoading={isLoading}
                  selectedId={currentTodo?.id}
                  showModal={handleCloseModal}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal onClose={handleCloseModal} selectedTodo={currentTodo} />
      )}
    </>
  );
};
