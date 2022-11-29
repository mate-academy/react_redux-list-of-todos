/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusSelect, setStatusSelect] = useState('all');

  // eslint-disable-next-line no-console
  console.log(statusSelect);

  // что нужно сделать чтобы по несколько раз мой statusSelect не генерился useCallback useMemo?
  useEffect(() => {
    (async () => {
      const allTodos = await getTodos();

      setTodos(allTodos);
      setIsLoading(true);

      if (statusSelect === 'active') {
        // console.log('its active');
        // setTodos(item);
        setTodos(allTodos.filter((todo) => todo.completed !== false));
        // todos.filter((todo) => todo.completed !== false);
      }

      if (statusSelect === 'completed') {
        // console.log('its completed');
        // setTodos(item);
        setTodos(allTodos.filter((todo) => todo.completed === false));
        // todos.filter((todo) => todo.completed !== false);
      }
    })();
  }, [statusSelect]);
  // useEffect(() => {
  //   getTodos().then((item) => {
  //     setTodos(item);
  //     setIsLoading(true);

  //     // норм ли это что я всегда тяну данные с сервера чтобы не делать доп стейт с пустым масивом для тодушек
  //     // котрый должен был бы обновлять тудушки которые фильтр бы срезал?
  //     // так как сейчас то у нас не будет копии тудушек и если сервер накроется то и селекты перестанут работать
  //     if (statusSelect === 'active') {
  //       console.log('its active');
  //       // setTodos(item);
  //       setTodos(item.filter((todo) => todo.completed !== false));
  //       // todos.filter((todo) => todo.completed !== false);
  //     }

  //     if (statusSelect === 'completed') {
  //       console.log('its completed');
  //       // setTodos(item);
  //       setTodos(item.filter((todo) => todo.completed === false));
  //       // todos.filter((todo) => todo.completed !== false);
  //     }

  //     // setTodos(item);

  //     console.log(todos);
  //   });
  // }, [statusSelect]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setStatusSelect={setStatusSelect} />
            </div>

            <div className="block">
              {isLoading ? (
                <TodoList
                  todos={todos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
