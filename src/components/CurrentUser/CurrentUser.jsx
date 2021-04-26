import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../helpers';
import './CurrentUser.scss';
import { setUserId } from '../../store/index';

export const CurrentUser = ({ userId }) => {
  const [selectedUserDetails, setSelectedUserDetails] = useState([]);
  const [isUserError, setIsUserError] = useState(false);
  const dispatch = useDispatch();

  const loadData = async () => {
    const selectedUser = await loadUser(userId);

    if (selectedUser.data === null) {
      setIsUserError(true);

      return false;
    }

    setSelectedUserDetails(selectedUser.data);
    setIsUserError(false);
  };

  useEffect(() => {
    loadData();
  });

  const onUserReset = () => {
    dispatch(setUserId(0));
  };

  return (
    <>
      {isUserError ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>Invalid User</span></h2>
        </div>
      )
        : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {userId}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUserDetails.name}</h3>
            <p className="CurrentUser__email">{selectedUserDetails.email}</p>
            <p className="CurrentUser__phone">{selectedUserDetails.phone}</p>
          </div>
        )}
      <button
        type="button"
        onClick={onUserReset}
      >
        Clear
      </button>
    </>
  );
};
