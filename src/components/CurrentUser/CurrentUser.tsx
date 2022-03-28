import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypeSelector';
import { TodosActionTypes } from '../../store/reducers/TodosReducer/types';
import { useActions } from '../../hooks/useActions';

import './CurrentUser.scss';
import { UserActionTypes } from '../../store/reducers/UserReducer/types';

export const CurrentUser: React.FC = () => {
  const { selectedUserId } = useTypedSelector(state => state.todos);
  const { user, loading, error } = useTypedSelector(state => state.user);
  const dispatch = useDispatch();
  const { fetchUser } = useActions();

  useEffect(() => {
    if (selectedUserId) {
      fetchUser(selectedUserId);
    }
  }, [selectedUserId]);

  const clearUser = () => {
    dispatch({ type: TodosActionTypes.DESELECT_USER });
    dispatch({ type: UserActionTypes.RESET_USER });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (user === null) {
    return <span>No user selected</span>;
  }

  return (
    <div className="CurrentUser">
      <button
        onClick={clearUser}
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        type="button"
      >
        Clear
      </button>

      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.website}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
