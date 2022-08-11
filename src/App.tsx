import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from './api';
import './App.scss';
import { Loader } from './components/Loader/Loader';
import { TodoFilter } from './components/TodoFilter';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';

import { useAppSelector } from './store';
import { actions as loadingActions } from './store/loading';
import { actions as todosActions } from './store/todos';

export const App = () => {
  const loading = useAppSelector(state => state.loading);
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    getTodos()
      .then((todosFromServer) => dispatch(
        todosActions.setTodos(todosFromServer),
      ))
      .finally(() => dispatch(
        loadingActions.finishLoading(),
      ));
  }, []);

  return (
    <div className="App">
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter />
              </div>

              <div className="block">
                { loading
                  ? <Loader />
                  : <TodoList />}
              </div>
            </div>
          </div>
        </div>

        {currentTodo && (
          <TodoModal />
        )}
      </>
    </div>
  );
};
