/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import {
  TODOS_SELECTORS,
  TODO_ACTIONS_CREATOR,
} from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FILTER_SELECTOR } from './features/filter';

export const App: React.FC = () => {
  const [todoSelect, setTodoSelect] = useState(0);
  const dispatch = useDispatch();
  const todos = useSelector(TODOS_SELECTORS.todosBySearchQuery(''));

  const { filterType, appliedQuery } = useSelector(FILTER_SELECTOR.filter);

  useEffect(() => {
    getTodos().then(res => dispatch(TODO_ACTIONS_CREATOR.set(res)));
  }, []);

  const todo = todos.find(element => element.id === todoSelect) || null;
  const onClose = () => {
    setTodoSelect(0);
  };

  const filtredByComleted = (
    nameFilter: string,
    todosList: Todo[],
  ): Todo[] => {
    switch (nameFilter) {
      case 'completed':
        return todosList.filter(item => item.completed === true);

      case 'active':
        return todosList.filter(item => item.completed === false);

      case 'all':
        return todosList;

      default:
        return todosList;
    }
  };

  const filredByQuery = (
    searchQury: string, todosList: Todo[],
  ): Todo[] => {
    if (searchQury === '') {
      return todosList;
    }

    return (todosList
      .filter(
        item => item.title.toLowerCase().includes(searchQury.toLowerCase()),
      ));
  };

  const filteredArray = useMemo(() => {
    const filteredBySelect = filtredByComleted(filterType, todos);

    return filredByQuery(appliedQuery, filteredBySelect);
  }, [filterType, appliedQuery, todos]);

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
              {todos.length
                ? (
                  <TodoList
                    setTodoSelect={setTodoSelect}
                    todoSelect={todoSelect}
                    filteredTodos={filteredArray}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {todoSelect !== 0
        && (
          <TodoModal
            todo={todo}
            onClose={onClose}
          />
        )}
    </>
  );
};
