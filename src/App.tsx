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
  const [query, setQuery] = useState<string>('');

  const filterBySearch = (todoTitle: string, queryText: string) => {
    return todoTitle.toLowerCase().includes(queryText);
  };

  // что нужно сделать чтобы по несколько раз мой statusSelect не генерился useCallback useMemo?
  // надо ли трай кетч сюда ставить?
  useEffect(() => {
    (async () => {
      const allTodos = await getTodos();

      // норм ли это что я всегда тяну данные с сервера чтобы не делать доп стейт с пустым масивом для тодушек
      // котрый должен был бы обновлять тудушки которые фильтр бы срезал?
      // так как сейчас то у нас не будет копии тудушек и если сервер накроется то и селекты перестанут работать
      setTodos(
        allTodos.filter((todo) => {
          const { title, completed } = todo;

          switch (statusSelect) {
            case 'active':
              return completed && filterBySearch(title, query);

            case 'completed':
              return !completed && filterBySearch(title, query);

            default:
              return todo && title.toLowerCase().includes(query);
          }
        }),
      );

      setIsLoading(true);
    })();
  }, [statusSelect, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatusSelect={setStatusSelect}
                setQuery={setQuery}
                query={query}
              />
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
