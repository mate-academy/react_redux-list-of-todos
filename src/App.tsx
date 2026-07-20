import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos, getUser } from './api';
import { useEffect } from 'react';

useEffect(() => {
  getTodos()

    .then(data => {
        setTodos(data);
    })
    .catch(console.error)
    .finally(() => {});
}, []);

export const App = () => (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="block">
            <Loader />
            <TodoList />
          </div>
        </div>
      </div>
    </div>

    <TodoModal />
);
