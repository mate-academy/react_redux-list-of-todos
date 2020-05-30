import React from 'react';


import './App.scss';
import { ConnectedTodos } from './components/Todos';
import { connect, useSelector } from 'react-redux';
import { getIsLoaded} from './store'
import { CustomTodo, RootState } from './types';
import { getCustomTodos } from './api';



const App = ({
  message,
  setCustomTodos,
  setMessage,
  setIsLoaded}:{
    setCustomTodos:(customTodos:CustomTodo[])=>void;
    setIsLoaded:(isLoaded: boolean)=>void;
    setMessage:(message: string)=>void;
    message: string;
  }) => {


  const handleButtonClick = () => {
    setMessage('Data is loaded now...')
    getCustomTodos().then(customTodos => {
      setCustomTodos(customTodos);
      setIsLoaded(true);

    });
  }

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {useSelector(getIsLoaded)
      ? <ConnectedTodos />
      : <button
        onClick={handleButtonClick}
      >{message}</button>}

    </div>
  );
};

const mapState = (state: RootState) => ({
  isLoaded: state.isLoaded,
  message: state.message,

})

const mapDisp = (dispatch: any) => ({
  setCustomTodos: (customTodos:CustomTodo[]) => dispatch({type: 'SET_CUSTOM_TODOS', customTodos}),
  setIsLoaded: (isLoaded:boolean) => dispatch({type: 'SET_IS_LOADED', isLoaded}),
  setMessage: (message: string) => dispatch({type: 'SET_MESSAGE', message}),
})



export const ConnectedApp =  connect(mapState, mapDisp)(App);
