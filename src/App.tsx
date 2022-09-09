import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { RootState } from './app/store';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const selectedTodo = useSelector((state: RootState) => state.selectTodo.todo);

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(todosData => {
      if (todosData && todosData.length) {
        dispatch(setTodos(todosData));
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="section">
        <div className="box">
          <h1 className="title">Redux list of todos</h1>
          <TodoFilter />
          {isLoading ? <Loader /> : (
            <TodoList />
          )}
          {selectedTodo && <TodoModal />}
        </div>
      </div>
    </div>
  );
};
