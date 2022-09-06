/* eslint-disable max-len */
import { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { useDispatch, useSelector } from 'react-redux';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { selectors } from './store';
import { actions as todosActions } from './store/todos';

export const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.getLoading);
  const selectedTodo = useSelector(selectors.getTodo);
  const todos = useSelector(selectors.getTodos);

  useEffect(() => {
    dispatch(todosActions.loadTodos);
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
              {loading && (<Loader />)}
              {todos.filtered.length > 0 && (
                <TodoList />
              )}
            </div>
          </div>
        </div>
      </div>

      { selectedTodo && (
        <TodoModal />
      )}
    </>
  );
};
