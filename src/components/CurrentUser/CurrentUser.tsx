import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../api/api';
import { getUserAction } from '../../store/actions';
import { getUserSelector } from '../../store/selectors';

type Props = {
  userId: number,
  clear: () => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, clear }) => {
  const dispatch = useDispatch();

  const [hasLoadingError, setHasLoadingError] = useState(true);

  const selectedUser = useSelector(getUserSelector);

  useEffect(() => {
    try {
      const loadUserFromServer = async () => {
        const userFromServer = await getUser(userId);

        dispatch(getUserAction(userFromServer));
      };

      loadUserFromServer();
    } catch (error) {
      setHasLoadingError(false);
    }
  }, [userId]);

  return (
    <>
      {
        hasLoadingError
          ? (
            <div className="CurrentUser">
              {selectedUser
                ? (
                  <>
                    <h2 className="CurrentUser__title">
                      <span>
                        {`Selected user: ${selectedUser.id}`}
                      </span>
                    </h2>

                    <button
                      type="button"
                      className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
                      onClick={clear}
                    >
                      Clear
                    </button>

                    <h3 className="CurrentUser__name">{selectedUser.name}</h3>
                    <p className="CurrentUser__email">{selectedUser.email}</p>
                    <p className="CurrentUser__phone">{selectedUser.phone}</p>
                  </>
                )
                : (
                  'Loading...'
                )}
            </div>
          )
          : <p>No users yet</p>
      }
    </>

  );
};
