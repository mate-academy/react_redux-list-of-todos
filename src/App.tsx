/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { useAppSelector } from './app/hooks';
import { getTodos } from './api';
import { actions as todosActions } from './features/todos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { RootState } from './app/store';

const filteredTodosSelector = (state: RootState) => {
  const { todos } = state;
  const { query, status } = state.filter;

  return todos.filter(todo => {
    const includesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case 'all':
        return includesQuery;

      case 'active':
        return todo.completed === false && includesQuery;

      case 'completed':
        return todo.completed && includesQuery;

      default:
        return true;
    }
  });
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const preparedTodos = useAppSelector(filteredTodosSelector);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todos => dispatch(todosActions.setTodos(todos)))
      .finally(() => setIsLoading(false));
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
              {isLoading
                ? <Loader />
                : <TodoList todos={preparedTodos} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
