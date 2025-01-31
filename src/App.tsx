import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import React from 'react';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(loadedTodos => {
        setTodos(loadedTodos);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

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
                todos={todos}
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
  </>;
};
