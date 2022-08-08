import { useSelector } from 'react-redux';

import './App.scss';
import { useEffect, useState } from 'react';
import Start from './components/Start';
import TodoList from './components/TodoList';
import { Finish } from './components/Finish';

import {
  isLoading, getMessage, getingTodos,
} from './store';
import Pagination from './components/Pagination';

const App = () => {
  const [filterBy, setFilterBy] = useState('all');
  const loading = useSelector(isLoading);
  const todosLength = useSelector(getingTodos).length;
  const message = useSelector(getMessage) || 'Ready!';
  const [selectedPage, setSelectedPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalItems, setTotalItems] = useState(0);
  const [visibleNumberTodos, setVNT] = useState([selectedPage, itemsPerPage]);

  const handlePageChange = (pageFromComponent: number) => {
    setSelectedPage(prevState => {
      if (prevState !== pageFromComponent) {
        return pageFromComponent;
      }

      return prevState;
    });
  };

  useEffect(() => {
    setTotalItems(todosLength);
  }, [todosLength]);

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

  const handlePerPageChange = (perPageFromComponent: number) => {
    setItemsPerPage(prevState => {
      if (prevState !== perPageFromComponent) {
        return perPageFromComponent;
      }

      return prevState;
    });
  };

  return (
    <div className="App">
      <h1 className="title">Redux list of todos</h1>
      <h2>{!loading ? 'Loading...' : message}</h2>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish
        title="Fail loading"
        message="An error occurred when loading data."
      />
      {loading && (
        <div>
          <button
            type="button"
            onClick={() => setFilterBy('all')}
            disabled={filterBy === 'all'}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilterBy('active')}
            disabled={filterBy === 'active'}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => setFilterBy('completed')}
            disabled={filterBy === 'completed'}
          >
            Completed
          </button>
        </div>
      )}

      <TodoList filterBy={filterBy} visibleNumberTodos={visibleNumberTodos} />
      {loading && (
        <Pagination
          total={totalItems}
          perPage={itemsPerPage}
          page={selectedPage}
          handlePageChange={handlePageChange}
          handlePerPageChange={handlePerPageChange}
        />
      )}
    </div>
  );
};

export default App;
