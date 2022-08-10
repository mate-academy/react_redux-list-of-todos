import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoModal from './components/TodoModal';
import Loader from './components/Loader';

import { getTodos } from './api/todos';

import Todo from './types/Todo';
import Status from './enums/Status';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const [todoStatusFilter, setTodoStatusFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);

      const response = await getTodos();

      setIsLoading(false);

      return response;
    };

    loadTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setVisibleTodos(todosFromServer);
      })
      .catch();
  }, []);

  const handleRandomizeClick = useCallback(() => {
    const shuffledTodos = [...visibleTodos];

    for (let i = shuffledTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (
        i + 1
      ));

      [shuffledTodos[i], shuffledTodos[j]]
        = [shuffledTodos[j], shuffledTodos[i]];
    }

    setVisibleTodos(shuffledTodos);
  }, []);

  useEffect(() => {
    const loweredQuery = query.toLowerCase();

    let newVisibleTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(loweredQuery)
    ));

    switch (todoStatusFilter) {
      case Status.Active:
        newVisibleTodos = newVisibleTodos.filter(todo => !todo.completed);
        break;

      case Status.Completed:
        newVisibleTodos = newVisibleTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    setVisibleTodos(newVisibleTodos);
  }, [query, todoStatusFilter]);

  const selectedTodo = useMemo(() => {
    return todos.find(todo => todo.id === selectedTodoId) || null;
  }, [todos, selectedTodoId]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setTodoStatusFilter}
                onQueryChange={setQuery}
                onRandomizeClick={handleRandomizeClick}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              <TodoList
                todos={visibleTodos}
                selectedTodoId={selectedTodoId}
                onSelectTodoClick={setSelectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId > 0 && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalCloseClick={() => setSelectedTodoId(0)}
        />
      )}
    </>
  );
};

// import { useSelector } from 'react-redux';
//
// import './App.scss';
// import { Start } from './components/Start';
// import { Finish } from './components/Finish';
//
// import { selectors } from './store';
//
// export const App = () => {
//   // `useSelector` connects our component to the Redux store
//   // and rerenders it after every dispatched action
//   const loading = useSelector(selectors.isLoading);
//
//   // we do not call a selector with (), just pass a link to it
//   const message = useSelector(selectors.getMessage) || 'Ready!';
//
//   return (
//     <div className="App">
//       <h1>Redux list of todos</h1>
//       <h2>{loading ? 'Loading...' : message}</h2>
//
//       {/* these buttons are used only for the demo */}
//       <Start title="Start loading" />
//       <Finish title="Succeed" message="Loaded successfully!" />
//       <Finish title="Fail" message="Error occurred." />
//     </div>
//   );
// };
