import React, { FC } from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ConnectedInitialButton } from './components/InitialButton/InitialButton';

import './App.css';

const App: FC = () => {
  return (
    <Provider store={store}>
      <ConnectedInitialButton />
    </Provider>
  );
};

export default App;
