import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../../store';
import { actions as userActions, LOAD } from '../../store/user';

import './CurrentUser.scss';

export function CurrentUser ({ userId, clearUser }) {
  // const [user, setUser] = useState(null);
  const user = useSelector(getUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions[LOAD](userId))
  }, [userId, dispatch])

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>

          <button
            className="CurrentUser__clear button"
            type="button"
            onClick={() => {
              clearUser();
            }}
          >
            Clear selected user
          </button>
        </>
      ) : (
        <>
          Loading...
        </>
      )}
    </div>
  );
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
