import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from '../../store/user';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const {
    id,
    name,
    email,
    phone,
  } = useSelector(userSelectors.getUser);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>

      <button
        type="button"
        className={classNames(
          'CurrentUser__clear',
          'button',
          'TodoList__user-button',
          'TodoList__user-button--selected',
        )}
        onClick={() => dispatch(userActions.clearUser())}
      >
        Clear
      </button>
    </div>
  );
};
