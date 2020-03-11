import React, { FC } from 'react';
import { connect } from 'react-redux';
import { UserList } from '../UserList/UserList';
import { getTodos, getUsers } from '../../api/DataFromServer';


const TYPE_IS_LOAD = 'isLoaded';
const PREPEARD_TOTO_LIST = 'prepearedTodoList';

const isLoadedType = (value: boolean) => ({
  type: TYPE_IS_LOAD,
  value,
});
const PrepearedTodoListType = (value: TodoWithUser[]) => ({
  type: PREPEARD_TOTO_LIST,
  value,
});


const getData = (state: State) => ({
  isLoaded: state.isLoaded,
  prepearedTodoList: state.prepearedTodoList,
});

const getMethods = (dispatch: any) => ({
  loadUsers: () => {
    dispatch(isLoadedType(true));

    Promise.all([getUsers(), getTodos()])
      .then(([user, todo]) => {
        const todoWithUser = todo.map(todoItem => (
          {
            ...todoItem,
            user: user.find(userItem => userItem.id === todoItem.userId) as User,
          }
        ));

        dispatch(isLoadedType(false));
        dispatch(PrepearedTodoListType(todoWithUser));
      });
  },
});

const InitialButton: FC<State & any> = ({ loadUsers, isLoaded, prepearedTodoList }) => {
  return (
    <>
      {
        prepearedTodoList.length === 0
          ? (
            <button
              type="button"
              onClick={loadUsers}
              disabled={isLoaded}
              className="load-btn"
            >
              Load
            </button>
          )
          : <UserList prepearedTodoList={prepearedTodoList} />
      }
      {isLoaded && (
        <p className="loading-text">Loading...</p>
      )}
    </>
  );
};

export const ConnectedInitialButton = connect(getData, getMethods)(InitialButton);
