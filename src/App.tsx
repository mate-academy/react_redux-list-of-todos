import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import React, { useCallback, useEffect, useState } from 'react';
import lodash from 'lodash';
import TodoList from './components/TodoList';

import { getingTodos } from './store';
import Pagination from './components/Pagination/Pagination';
import { Loader } from './components/Loader';
import { fetchTodos } from './store/action-creators/todos';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { PaginationActionTypes } from './store/reducers/paginationReducer';

const App = () => {
  const [filterBy, setFilterBy] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');
  const {
    todos, error, loading, todo,
  } = useSelector(getingTodos);
  const [checkedTodo, setCheckedTodo] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const applyQuery = useCallback(
    lodash.debounce(setAppliedQuery, 1000), [],
  );

  const resetInputValue = () => {
    setAppliedQuery('');
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  useEffect(() => {
    dispatch({
      type: PaginationActionTypes.UPDATE_TOTAL_AMOUNT,
      payload: todos.length,
    });
  }, [todos]);

  const openModalHandler = () => {
    setCheckedTodo(true);
  };

  const closeModalHandler = () => {
    setCheckedTodo(false);
  };

  return (
    <div className="App">
      <h1 className="title">Redux list of todos</h1>
      {loading && <Loader />}
      {loading && error && (
        <h2>{error}</h2>
      )}
      {!loading && error === null && (
        <div>
          <TodoFilter
            handleUserChange={handleUserChange}
            applyQuery={applyQuery}
            resetInputValue={resetInputValue}
          />
          <TodoList
            filterBy={filterBy}
            openModalHandler={openModalHandler}
            appliedQuery={appliedQuery}
          />
          <Pagination />
          {todo !== null && checkedTodo && (
            <TodoModal closeModalHandler={closeModalHandler} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
