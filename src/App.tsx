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

const App = () => {
  const [filterBy, setFilterBy] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');
  const {
    todos, error, loading, todo,
  } = useSelector(getingTodos);
  const [checkedTodo, setCheckedTodo] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [visibleNumberTodos, setVNT] = useState([selectedPage, itemsPerPage]);
  const dispatch = useDispatch();

  const handlePageChange = (pageFromComponent: number) => {
    setSelectedPage(prevState => {
      if (prevState !== pageFromComponent) {
        return pageFromComponent;
      }

      return prevState;
    });
  };

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
    setTotalItems(todos.length);
  }, [todos]);

  const updateInfo = () => {
    for (let i = 1; i < totalItems; i += 1) {
      const start = selectedPage * itemsPerPage - (itemsPerPage - 1);
      const finish = ((selectedPage * itemsPerPage) < totalItems)
        ? selectedPage * itemsPerPage
        : totalItems;

      setVNT([start, finish]);
    }
  };

  useEffect(() => {
    updateInfo();
  }, [selectedPage, itemsPerPage]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const handlePerPageChange = (perPageFromComponent: number) => {
    setItemsPerPage(prevState => {
      if (prevState !== perPageFromComponent) {
        return perPageFromComponent;
      }

      return prevState;
    });
  };

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
            visibleNumberTodos={visibleNumberTodos}
            appliedQuery={appliedQuery}
          />
          <Pagination
            total={totalItems}
            perPage={itemsPerPage}
            page={selectedPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
          />
          {todo !== null && checkedTodo && (
            <TodoModal closeModalHandler={closeModalHandler} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
