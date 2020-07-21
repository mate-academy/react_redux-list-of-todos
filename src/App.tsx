import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import Start from './components/Start';

import { isLoading } from './store';

const App = () => {
  const loading = useSelector(isLoading);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : 'message'}</h2>

      <Start />
    </div>
  );
};

export default App;
