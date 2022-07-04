/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  // function shuffleArray(array: any) {
  //   let curId = array.length;

  //   while (curId !== 0) {
  //     const randId = Math.floor(Math.random() * curId);

  //     curId -= 1;
  //     const tmp = array[curId];

  //     array[curId] = array[randId];
  //     array[randId] = tmp;
  //   }

  //   return array;
  // }

  // const randomSort = () => {
  //   request(urlTodos)
  //     .then(todos => {
  //       const sorted = shuffleArray(todos);

  //       setTheTodos(sorted);
  //     });
  // };

  // const selectUser = (selectedId: number) => {
  //   if (selectedId !== selectedUserId) {
  //     setSelectedUserId(selectedId);
  //   }
  // };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser />
        </div>
      </div>
    </div>
  );
};

export default App;
