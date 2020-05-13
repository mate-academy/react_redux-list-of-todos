import React, { FC } from 'react';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { Button } from './components/Button';
import { TodoList } from './components/TodoList';
import { SortOptions } from './components/SortOptions';

import {
  loadData,
  setIsLoading,
  setDataWasLoaded,
} from './actions';
import {
  AppState,
  IsLoadingAction,
} from './constants/types';
import './App.css';

interface Props {
  dataWasLoaded: boolean;
  isLoading: boolean;
  loadData: Function;
  setIsLoading(isLoading: boolean): IsLoadingAction;
  setDataWasLoaded(): Action;
}


const AppTemplate: FC<Props> = (props) => {
  const {
    dataWasLoaded,
    isLoading,
    loadData: loadDataActionCreator,
    setIsLoading: setLoadingActionCreator,
    setDataWasLoaded: setDataWasLoadedActionCreator,
  } = props;

  const handleLoadButtonClick = () => {
    setLoadingActionCreator(true);

    loadDataActionCreator()
      .then(() => setDataWasLoadedActionCreator())
      .finally(() => setLoadingActionCreator(false));
  };

  const renderLoadButton = (): JSX.Element | null => {
    if (dataWasLoaded) {
      return null;
    }

    if (isLoading) {
      return (
        <Button
          text="Loading"
          disabled
        />
      );
    }

    return (
      <Button
        text="Load"
        onClick={handleLoadButtonClick}
      />
    );
  };

  return (
    <div className="App">
      {renderLoadButton()}
      {dataWasLoaded && <SortOptions />}
      {dataWasLoaded && <TodoList />}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    dataWasLoaded: state.dataWasLoaded,
    isLoading: state.isLoading,
  };
};

export const App = connect(
  mapStateToProps,
  { loadData, setIsLoading, setDataWasLoaded },
)(AppTemplate);
