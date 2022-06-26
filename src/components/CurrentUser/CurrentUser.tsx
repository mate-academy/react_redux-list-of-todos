import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserByIdAction } from '../../store/actions';
import { getSelectedUserById } from '../../store/selectors';
import './CurrentUser.scss';

type Props = {
};

export const CurrentUser: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(getSelectedUserById);

  const clearUser = () => {
    dispatch(setUserByIdAction(null));
  };

  return (
    <>
      {selectedUser
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${selectedUser?.id}`}</span>
            </h2>

            <button
              type="button"
              className="button"
              onClick={clearUser}
            >
              Clear
            </button>

            <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
            <p className="CurrentUser__email">{selectedUser?.email}</p>
            <p className="CurrentUser__phone">{selectedUser?.phone}</p>
          </div>
        ) : 'No selected user'}
    </>
  );
};
