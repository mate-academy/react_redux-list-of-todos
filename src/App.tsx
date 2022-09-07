/* eslint-disable max-len */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, FilterBy } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [completedFilter, setCompletedFilter] = useState(FilterBy.NONE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const onCloseSelected = useCallback(() => {
    setSelectedTodoId(0);
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find((todo) => todo.id === selectedTodoId)
  ), [selectedTodoId]);

  const filteredToDo = useMemo(() => (
    todos.filter(todo => {
      const queryFilter = todo.title.toLowerCase().includes(searchQuery.toLowerCase());

      switch (completedFilter) {
        case FilterBy.ACTIVE:
          return queryFilter && !todo.completed;

        case FilterBy.COMPLETED:
          return queryFilter && todo.completed;

        default:
          return queryFilter;
      }
    })
  ), [searchQuery, todos, completedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                completedFilter={completedFilter}
                setCompletedFilter={setCompletedFilter}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={filteredToDo}
                    selectedTodoID={selectedTodoId}
                    selectedTodo={(todo: React.SetStateAction<number>) => {
                      setSelectedTodoId(todo);
                    }}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      { selectedTodo
        && <TodoModal todo={(selectedTodo)} onClose={onCloseSelected} />}
    </>
  );
};
