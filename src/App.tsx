import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from './api/api';

import './App.scss';

import {
  getOrder,
  getSortedTodos,
  setDeleteItem,
  setOrder,
  setSortField,
  setTodos,
  getSortField,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const visibleTodos = useSelector(getSortedTodos);
  const order = useSelector(getOrder);
  const sortField = useSelector(getSortField);

  const handleSort = (sortBy: string) => {
    if (order === '' || order === 'DES') {
      dispatch(setOrder('ASC'));
    } else if (order === 'ASC') {
      dispatch(setOrder('DES'));
    }

    if (sortField !== sortBy) {
      dispatch(setOrder('ASC'));
    }

    dispatch(setSortField(sortBy));
  };


  return (
    <div className="App">
      {!visibleTodos.length ? (<button type="button" onClick={() => getData().then(data => dispatch(setTodos(data)))}>Load</button>) : (
        <>
          <h1>Redux list of todos</h1>
          <table>
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => handleSort('id')}>
                    Sort by id
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => handleSort('username')}>
                    Sort by name
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => handleSort('title')}>
                    Sort by title
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => handleSort('status')}>
                    Sort by status
                  </button>
                </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {visibleTodos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.user?.username}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? 'Completed' : 'Active'}</td>
                  <td>
                    <button type="button" onClick={() => dispatch(setDeleteItem(todo.id))}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
