import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { setTodos } from './features/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todosFromState = useSelector((state: RootState) => state.todos);
  const filter = useSelector((state: RootState) => state.filter);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(loadedTodos => {
        dispatch(setTodos(loadedTodos));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const getFilteredTodos = (
    todos: Todo[],
    status: string,
    query: string,
  ): Todo[] => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);
      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  };

  const filteredTodos = getFilteredTodos(
    todosFromState,
    filter.status,
    filter.query,
  );

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
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onShowTodo={handleShowTodo}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};
