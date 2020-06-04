import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from './api/api';

import './App.scss';

import {
  getSortedTodos,
  setDeleteItem,
  setSortField,
  setTodos,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const visibleTodos = useSelector(getSortedTodos);

  return (
    <div className="App">
      {!visibleTodos.length ? (<button type="button" onClick={() => getData().then(data => dispatch(setTodos(data)))}>Load</button>) : (
        <>
          <h1>Redux list of todos</h1>
          <table>
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => dispatch(setSortField('id'))}>
                    Sort by id
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => dispatch(setSortField('username'))}>
                    Sort by name
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => dispatch(setSortField('title'))}>
                    Sort by title
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => dispatch(setSortField('status'))}>
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
