/* eslint-disable max-len */
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { effect, signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { StrictMode } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { selectedTodo, todos } from './signals';

const loading = signal<boolean>(true);

effect(() => {
  getTodos()
    .then(t => {
      todos.value = t;
    })
    .then(() => {
      loading.value = false;
    });
});

export const App: React.FC = () => {
  useSignals();

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
              {loading.value ? <Loader /> : <TodoList />}
            </div>
          </div>
        </div>
      </div>
      <StrictMode>{!!selectedTodo.value && <TodoModal />}</StrictMode>
    </>
  );
};
