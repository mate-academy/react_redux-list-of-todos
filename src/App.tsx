import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [isTodosAreLoaded, setIsTodosAreLoaded] = useState(false);
  const [filteredTodo, setFilteredTodos] = useState<Todo[]>([]);
  const dispatch = useDispatch();
  const todosFromServer = useAppSelector(state => state.todos);
  const query = useAppSelector(state => state.filter.query);
  const todosStatus = useAppSelector(state => state.filter.status);
  const todoModal = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    let todosToFilter = todosFromServer;

    if (query) {
      todosToFilter = todosToFilter.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase().trim()),
      );
    }

    if (todosStatus === Status.Active) {
      todosToFilter = todosToFilter.filter(todo => !todo.completed);
    } else if (todosStatus === Status.Completed) {
      todosToFilter = todosToFilter.filter(todo => todo.completed);
    }

    setFilteredTodos(todosToFilter);
  }, [todosFromServer, query, todosStatus]);

  useEffect(() => {
    setIsTodosAreLoaded(false);

    getTodos()
      .then(allTodos => {
        dispatch(todosActions.add(allTodos));
      })
      .finally(() => setIsTodosAreLoaded(true));
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
              {!isTodosAreLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodo}
                  selectedTodo={todoModal}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {todoModal && (
        <TodoModal todo={todoModal} />
      )}
    </>
  );
};
