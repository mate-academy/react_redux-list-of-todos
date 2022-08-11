/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { actionsLoading, selectorsLoading } from './store/loading';
import { Loader } from './components/Loader';

enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoSelected, setTodoSelected] = useState<Todo | null>(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [typeOfSelection, setTypeOfSelection] = useState<string>(FilterType.ALL);
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectorsLoading.getLoaded);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => dispatch(actionsLoading.finishLoading()));
  }, []);

  useEffect(() => {
    switch (typeOfSelection) {
      case FilterType.ALL:
        setVisibleTodos(todos);
        break;

      case FilterType.ACTIVE:
        setVisibleTodos(todos
          .filter(todo => todo.completed === false));
        break;

      case FilterType.COMPLETED:
        setVisibleTodos(todos.filter(todo => todo.completed === true));
        break;

      default:
        break;
    }

    const lowQuery = appliedQuery.toLowerCase();

    setVisibleTodos(currentTodos => currentTodos
      .filter(todo => todo.title.toLowerCase().includes(lowQuery)));
  }, [typeOfSelection, appliedQuery, todos]);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleInputQuery = (inputQuery: string) => {
    setQuery(inputQuery);
  };

  const handleFilterType = (selectType: string) => {
    setTypeOfSelection(selectType);
  };

  const handleTodoSelect = (selectedTodo: Todo | null) => {
    setTodoSelected(selectedTodo);
  };

  const mixTodos = (todosVisible: Todo[]) => {
    setVisibleTodos([...todosVisible].sort(() => Math.random() - 0.5));
  };

  const reset = () => setQuery('');

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onReset={reset}
                onApplyQuery={applyQuery}
                onHandleInputQuery={handleInputQuery}
                onHandleFilterType={handleFilterType}
              />
            </div>

            <div className="block">
              {!isLoaded
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    todoSelectedId={todoSelected?.id || 0}
                    onTodoSelect={handleTodoSelect}
                    onMixTodos={mixTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {todoSelected && (
        <TodoModal
          todo={todoSelected}
          onClose={setTodoSelected}
        />
      )}
    </>
  );
};
