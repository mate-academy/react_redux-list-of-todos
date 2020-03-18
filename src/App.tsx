import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TodoList } from './components/TodoList';
import './App.css';
import { Actions } from './components/Actions';
import * as actions from './redux/actions';

interface Methods {
  loadData: () => void;
}

type Props = Methods & {
  isLoaded: boolean;
  isLoading: boolean;
};


const AppTemplate: FC<Props> = ({
  isLoaded,
  isLoading,
  loadData,
}) => {
  function handleStart() {
    loadData();
  }

  return (
    <>
      {isLoaded ? (
        <>
          <Actions />
          <TodoList />
        </>
      ) : (
        <button
          className="button"
          type="button"
          onClick={handleStart}
        >
             Press to start
        </button>
      )}

      {isLoading && <p>Loading...</p>}
    </>
  );
};

const mapStateToProps = (
  state: {
    loadReducer: LoadState;
  },
) => ({
  isLoaded: state.loadReducer.isLoaded,
  isLoading: state.loadReducer.isLoading,
});

const mapDispatchToProps = {
  loadData: actions.loadData,
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppTemplate);
