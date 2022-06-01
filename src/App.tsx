import {
  FC,
} from 'react';
import { useSelector } from 'react-redux';

import './App.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Start } from './components/Start/Start';
import { Finish } from './components/Finish/Finish';

import { isLoading, getMessage } from './store/LoadingReducer/selectors';
import { getSelectedIDSelector } from './store/TodosReducer/selectors';

const App: FC = () => {
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';
  const selectedUserId = useSelector(getSelectedIDSelector);

  return (
    <div className="App">
      <div className="App__sidebar">
        <div className="App__WTF-panel">
          <h2>
            {loading ? 'Loading...' : message}
          </h2>

          <Start title="Start loading" />

          <Finish
            title="Succeed loading"
            message="Loaded successfully!"
          />

          <Finish
            title="Fail loading"
            message="An error occurred when loading data."
          />

        </div>

        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
