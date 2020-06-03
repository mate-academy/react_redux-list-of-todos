import React from 'react';
import './App.scss';
import Todos from './components/Todos';
import { connect, useSelector } from 'react-redux';
import { getIsLoaded } from './store'
import { WithUserTodo, RootState } from './types';
import { getWithUserTodos } from './api';
import { SET_WITH_USER_TODOS, SET_IS_LOADED, SET_BUTTON_TEXT } from './store/index';

const App = ({
  buttonText,
  setWithUserTodos,
  setButtonText,
  setIsLoaded
}: {
  setWithUserTodos: (withUserTodos: WithUserTodo[]) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setButtonText: (buttonText: string) => void;
  buttonText: string;
}) => {

  const handleButtonClick = () => {
    setButtonText('Data is loaded now...')
    getWithUserTodos().then(withUserTodos => {
      setWithUserTodos(withUserTodos);
      setIsLoaded(true);
    });
  }

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      {useSelector(getIsLoaded)
        ? <Todos />
        : (
          <button
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        )}
    </div>
  );
};

const mapState = (state: RootState) => ({
  isLoaded: state.isLoaded,
  buttonText: state.buttonText,
})

const mapDispatch = (dispatch: any) => ({
  setWithUserTodos: (withUserTodos: WithUserTodo[]) => dispatch({
    type: SET_WITH_USER_TODOS,
    withUserTodos
  }),
  setIsLoaded: (isLoaded: boolean) => dispatch({
    type: SET_IS_LOADED,
    isLoaded
  }),
  setButtonText: (buttonText: string) => dispatch({
    type: SET_BUTTON_TEXT,
    buttonText
  }),
})

export default connect(mapState, mapDispatch)(App);
