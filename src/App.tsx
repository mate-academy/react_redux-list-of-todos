import React from 'react';
import './styles/general.scss';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { getIsUserLoading, getUser } from './store/selectors';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';

const App: React.FC = () => {
  const user = useSelector(getUser);
  const isUserLoading = useSelector(getIsUserLoading);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          <progress
            className={classNames(
              'progress',
              'is-small',
              'is-link',
              { 'App__content--hidden': !isUserLoading },
            )}
            max="100"
          >
            10%
          </progress>
          {user ? (
            <CurrentUser />
          ) : <span className="App__content-notification">No user selected</span>}
        </div>
      </div>
    </div>
  );
};

export default App;
