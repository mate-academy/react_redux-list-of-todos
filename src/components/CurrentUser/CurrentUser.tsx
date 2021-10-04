import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUserDetails } from '../../store';

import './CurrentUser.scss';

interface Props {
  handleClick: any,
}

export const CurrentUser: React.FC<Props> = ({ handleClick }) => {
  const dispatch = useDispatch();
  const { selectedUserId, user } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(setUserDetails(selectedUserId));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {user?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={(event => handleClick(event, 0, 0))}
      >
        Clear
      </button>
    </div>
  );
};
