import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodosFilter } from './Types/TodosFilter';
import { selectors, store } from './store';
import { actions } from './store/loading';
import { todosActions } from './store/todos';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.isLoading);
  const selectedTodo = useSelector(selectors.selectedTodo);
  const todosFromSever = useSelector(selectors.todosList);
  const todosFilter = useSelector(selectors.filterTodos);

  useEffect(() => {
    dispatch(actions.startLoading());
    // eslint-disable-next-line no-console
    console.log(store.getState());
    getTodos()
      .then((todosFromServer) => {
        dispatch(todosActions.SetTodos(todosFromServer));
      })
      .finally(() => {
        dispatch(actions.finishLoading());
        // eslint-disable-next-line no-console
        console.log(store.getState());
      });
  }, []);

  const prepareTasks = () => {
    return todosFromSever
      .filter(task => {
        if (todosFilter.status === TodosFilter.ACTIVE) {
          return !task.completed;
        }

        if (todosFilter.status === TodosFilter.COMPLETED) {
          return task.completed;
        }

        return task;
      })
      .filter(task => {
        return task.title.includes(todosFilter.query);
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
              <TodoFilter />
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
        <TodoModal />
      )}
    </>
  );
};
