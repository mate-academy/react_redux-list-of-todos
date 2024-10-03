import React, { useEffect, useState } from 'react';
import { useAppSelector } from './utils/hooks';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { addTodos } from './features/todos';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const selectedTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const data = await getTodos();

        dispatch(addTodos(data));
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
