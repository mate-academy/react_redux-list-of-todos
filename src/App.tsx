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
      <h1>Redux list of todos</h1>
      {/* <h2>{loading ? 'Loading...' : message}</h2> */}

      {/* <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish title="Fail loading" message="An error occurred when loading data." /> */}
      <TodoList
        onUserChange={setSelectedUserId}
      />
      {selectedUserId && (
        <CurrentUser
          userId={selectedUserId}
          onClear={setSelectedUserId}
        />
      )}
    </div>
  );
};

export default App;
