import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromServer } from './helpers/api';
import {
  startLoading, handleSuccess, handleError, RootState,
} from './store';

import { ToDoList } from './components/ToDoList';

const App = () => {
  const tasks = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleLoadClick = async () => {
    try {
      dispatch(startLoading());
      const res = await getDataFromServer();
      const [users, todos] = res;
      const preparedTodos = todos.map((task: ToDo) => ({
        ...task,
        user: users.find((user: User) => user.id === task.userId),
      }));

      dispatch(handleSuccess(preparedTodos));
    } catch {
      dispatch(handleError());
    }
  };

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <button type="button" onClick={handleLoadClick}> Load Data</button>
      <div className="container">
        <ToDoList todos={tasks} />
      </div>
    </div>
  );
};

export default App;
