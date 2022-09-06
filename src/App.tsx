import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './Types/Todo';
import { TodosFilter } from './Types/TodosFilter';
import { selectors, store } from './store';
import { actions } from './store/loading';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.isLoading);
  const selectedTodo = useSelector(selectors.selectedTodo);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBy, setFilteredBy]
    = useState<TodosFilter>(TodosFilter.DEFAULT);

  useEffect(() => {
    dispatch(actions.startLoading());
    // eslint-disable-next-line no-console
    console.log(store.getState());
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      })
      .finally(() => {
        dispatch(actions.finishLoading());
        // eslint-disable-next-line no-console
        console.log(store.getState());
      });
  }, []);

  const prepareTasks = () => {
    return todos
      .filter(task => {
        if (filteredBy === TodosFilter.ACTIVE) {
          return !task.completed;
        }

        if (filteredBy === TodosFilter.COMPLETED) {
          return task.completed;
        }

        return task;
      })
      .filter(task => {
        return task.title.includes(searchQuery);
      });
  };

  const preparedTodos = prepareTasks();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredBy={filteredBy}
                setFilteredBy={setFilteredBy}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={preparedTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
        />
      )}
    </>
  );
};
