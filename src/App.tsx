import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';

import { useAppSelector } from './store';
import { Loader } from './components/Loader';
import { getTodos } from './components/api';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { actions as loadingActions } from './store/loading';
import { actions as todosActions } from './store/todos';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(state => state.loading);
  const selectedTodo = useAppSelector(state => state.selectedTodo);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    getTodos()
      .then(todosFromServer => dispatch(todosActions.setTodos(todosFromServer)))
      .finally(() => dispatch(loadingActions.finishLoading()));
  }, []);

  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="box">
            <h1>Redux list of todos</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal />
      )}
    </div>
  );
};
