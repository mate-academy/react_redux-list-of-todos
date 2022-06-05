import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User } from '../../type/user';
import { userAction } from '../../store/userReducer';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();

  const user: User
    = useSelector((state: RootState) => state.userReducer.user);
  const userError
    = useSelector((state: RootState) => state.userReducer.messageError);

  return !userError ? (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={() => {
          dispatch(userAction.clearUser());
        }}
      >
        Clear
      </button>
    </div>
  ) : (
    <h2 className="CurrentUser__title"><span>Please try again</span></h2>
  );
};
