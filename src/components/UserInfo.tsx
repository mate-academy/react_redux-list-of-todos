import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  stateUserInfo, clearUserState, setIsUserSelected
} from '../store';
import { ErrorWarning } from './ErrorWarning';
import { USER } from '../typesDef';

export const UserInfo: FC = () => {
  const stateUser: USER = useSelector(stateUserInfo);
  const dispatch = useDispatch();

  const resetUser = () => {
    dispatch(clearUserState());
    dispatch(setIsUserSelected(false));
  };

  return (
    <div className="row sticky-top">
      <div className="col">
        <h1 className="text-center">
          User Info
        </h1>
        {stateUser ? (
          <div className="card border-info mb-3">
            <div className="card-header">{stateUser.username}</div>
            <div className="card-body text-info">
              <h5 className="card-title">{stateUser.name}</h5>
              <p className="card-text">
                {`phone: ${stateUser.phone}`}
              </p>
              <p className="card-text">
                {`email: ${stateUser.email}`}
              </p>
              <p className="card-text">
                {`website: ${stateUser.website}`}
              </p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => resetUser()}
              >
                Clear user info
              </button>
            </div>
          </div>
        ) : <ErrorWarning data={'user'} solution={'choose another user'} />
        }
      </div>
    </div>
  );
};
