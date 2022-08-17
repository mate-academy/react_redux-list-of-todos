/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import debounce from 'lodash.debounce';

import { useDispatch } from 'react-redux';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { useAppSelector } from './store/hooks';
import { loadTodos } from './store';
import { clearTodo } from './features/selectedTodo';

enum FilterType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const { items: todos, loaded } = useAppSelector(state => state.todos);
  const todoSelected = useAppSelector(state => state.selectedTodo);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [typeOfSelection, setTypeOfSelection] = useState<string>(FilterType.ALL);

  const clearSelection = () => {
    dispatch(clearTodo());
  };

  useEffect(() => {
    dispatch(loadTodos());
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

  // const handleTodoSelect = (selectedTodo: Todo | null) => {
  //   setTodoSelected(selectedTodo);
  // };

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
              {!loaded
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
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
          onClose={clearSelection}
        />
      )}
    </>
  );
};
