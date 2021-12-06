import { useState } from 'react';
import './App.scss';
// import Start from './components/Start';
// import { Finish } from './components/Finish';

// import { isLoading, getMessage } from './store';
import TodoList from './components/TodoList/TodoList';
import CurrentUser from './components/CurrentUser/CurrentUser';

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          onUserChange={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onClear={setSelectedUserId}
            />
          ) : (
            'No user selected'
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
