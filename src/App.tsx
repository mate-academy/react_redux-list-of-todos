import React from 'react';
import './App.scss';
import Todos from './components/Todos';
import { connect, useSelector } from 'react-redux';
import { getIsLoaded } from './store'
import { CustomTodo, RootState } from './types';
import { getCustomTodos } from './api';

const App = ({
  buttonText,
  setCustomTodos,
  setButtonText,
  setIsLoaded
}: {
  setCustomTodos: (customTodos: CustomTodo[]) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setButtonText: (buttonText: string) => void;
  buttonText: string;
}) => {

  const handleButtonClick = () => {
    setButtonText('Data is loaded now...')
    getCustomTodos().then(customTodos => {
      setCustomTodos(customTodos);
      setIsLoaded(true);
    });
  }

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {useSelector(getIsLoaded)
        ? <Todos />
        : <button
          onClick={handleButtonClick}
        >{buttonText}</button>}
    </div>
  );
};

const mapState = (state: RootState) => ({
  isLoaded: state.isLoaded,
  buttonText: state.buttonText,
})

const mapDisp = (dispatch: any) => ({
  setCustomTodos: (customTodos: CustomTodo[]) => dispatch({
    type: 'SET_CUSTOM_TODOS',
    customTodos
  }),
  setIsLoaded: (isLoaded: boolean) => dispatch({
    type: 'SET_IS_LOADED',
    isLoaded
  }),
  setButtonText: (buttonText: string) => dispatch({
    type: 'SET_BUTTON_TEXT',
    buttonText
  }),
})

export default connect(mapState, mapDisp)(App);
