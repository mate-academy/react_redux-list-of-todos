import React, { FC } from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

import UserList from './components/UserList/UserList';
import './App.css';
import { loadUsers } from './store/store';

interface AppProps {
  prepearedTodoList: TodoWithUser[];
  isLoading: boolean;
  loadUsers: Dispatch;
}

// eslint-disable-next-line no-shadow
const App: FC<AppProps> = ({ prepearedTodoList, isLoading, loadUsers }) => {
  return (
    <>
      {
        prepearedTodoList.length === 0
          ? (
            <button
              type="button"
              onClick={loadUsers}
              disabled={isLoading}
              className="load-btn"
            >
                    Load
            </button>
          )
          : <UserList prepearedTodoList={prepearedTodoList} />
      }
      {isLoading && (
        <p className="loading-text">Loading ...</p>
      )}
    </>
  );
};

const mapStateToProps = (state: InitialStateInterface) => ({
  isLoading: state.isLoading,
  prepearedTodoList: state.prepearedTodoList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadUsers: () => dispatch(loadUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
