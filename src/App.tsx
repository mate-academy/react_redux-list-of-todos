import React, { FC } from 'react';

import { connect } from 'react-redux';

import UserList from './components/UserList/UserList';
import './App.css';
import { loadUsers } from './store/store';

const App: FC<any> = ({ prepearedTodoList, loadingCondition, loadUsers }) => {
  return (
    <>
      {
        prepearedTodoList.length === 0
          ? (
            <button
              type="button"
              onClick={loadUsers}
              disabled={loadingCondition}
              className="load-btn"
            >
                    Load
            </button>
          )
          : <UserList prepearedTodoList={prepearedTodoList} />
      }
      {loadingCondition && (
        <p className="loading-text">Loading ...</p>
      )}
    </>
  );
};

const mapStateToProps = (state: InitialStateInterface) => ({
  loadingCondition: state.loadingCondition,
  prepearedTodoList: state.prepearedTodoList,
});

const mapDispatchToProps = (dispatch: any) => ({
  loadUsers: () => dispatch(loadUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
