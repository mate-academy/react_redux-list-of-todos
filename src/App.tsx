import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { getFilteredTodos } from './helpers/getFilteredTodos';
import { actions as todosActions } from './features/todos';
import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const sortType = useAppSelector(state => state.filter.status);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalShowed, setIsModalShowed] = useState(false);

  const filteredTodos = getFilteredTodos(todos, sortType, query);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => dispatch(todosActions.setTodos(response)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter />
                </div>

                <div className="block">
                  {filteredTodos.length === 0 ? (
                    <p className="notification is-warning">
                      There are no todos matching current filter criteria
                    </p>
                  ) : (
                    <TodoList
                      todos={filteredTodos}
                      selectedTodoId={selectedTodo?.id || 0}
                      setIsModalShowed={setIsModalShowed}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalShowed && (
        <TodoModal
          selectedTodo={selectedTodo as Todo}
          setIsModalShowed={setIsModalShowed}
        />
      )}
    </>
  );
};
