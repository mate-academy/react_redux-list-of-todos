import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
// import { selectors, setNewQuery } from './store/filterQuerySlice';
// import { useAppSelector, useAppDispatch } from './typedHooks/hooks';

import './App.scss';
import { useGetToDosQuery } from './store/apiWithRedux';

const App = () => {
  // eslint-disable-next-line max-len
  const { data: toDos, error } = useGetToDosQuery('', { pollingInterval: 0 });

  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const clearSelectedUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        {!error && toDos ? (
          <TodoList
            toDos={toDos}
            setSelectedUserId={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        )
          : (
            <>
              <h2>
                Loading Error
              </h2>
              <h3>
                No toDos data
              </h3>
            </>
          )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              clearSelectedUserId={clearSelectedUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
