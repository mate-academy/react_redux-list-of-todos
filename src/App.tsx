import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { set, update } from './features/todos';
import { useAppDispatch, useAppSelector } from './app/store';
import { setSelectedTodo } from './features/currentTodo';
import { setQuery, setStatus } from './features/filter';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        dispatch(set(todosFromServer));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleChecking = (id: number) => {
    const clickedTodo = todos.find(t => t.id === id);

    if (clickedTodo) {
      const updatedTodo = { ...clickedTodo, isWatched: true };

      dispatch(setSelectedTodo(updatedTodo));
      dispatch(update(updatedTodo));
    }
  };

  const closeModal = () => {
    if (selectedTodo) {
      dispatch(update({ ...selectedTodo, isWatched: false }));
    }

    dispatch(setSelectedTodo(null));
  };

  const visibleTodos = todos.filter(todo => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSearch={val => dispatch(setQuery(val))}
                handleStatusChange={val => dispatch(setStatus(val))}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  handleChecking={handleChecking}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};
