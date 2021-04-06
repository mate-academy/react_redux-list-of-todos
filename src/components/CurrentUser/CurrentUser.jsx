import React, { useEffect } from 'react';
import './CurrentUser.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, getUserProfile } from '../../store/selectors';
import { clearUserId, getUserProfileById } from '../../store/actions';

function CurrentUser() {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const user = useSelector(getUserProfile);

  useEffect(() => {
    dispatch(getUserProfileById(userId));
  }, [userId]);

  if (!user) {
    return (<span> Wait please </span>);
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${userId}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        type="button"
        className="button is-dark"
        onClick={() => dispatch(clearUserId())}
      >
        Clear
      </button>
    </div>
  );
}

export default CurrentUser;
