import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/api';
import { loadIdSelector, selectedUserSelector } from '../../selectors';
import { setUserFromServe, setIdAction } from '../../actions';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const userFromServe = useSelector(selectedUserSelector);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const userId = useSelector(loadIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getUser(userId)
      .then((user) => {
        dispatch(setUserFromServe(user));
      })
      .then(() => setLoading(false))
      .catch(() => setLoadingError(true));
  }, [userId]);

  return (
    <>
      {loading && (
        <p className="loading">In process...</p>
      )}

      {(loadingError && loading) && (
        <p className="loading">Failed loading data</p>
      )}

      {(loading && !loadingError) && (
        <div className="current">
          <div className="current__title">
            <button
              type="button"
              className="current__title-btn"
              onClick={() => dispatch(setIdAction(100))}
            >
              Clear
            </button>
            <h2>Selected User:</h2>
          </div>
          <div className="current__user user">
            <h3 className="user__id">{`User: ${userFromServe?.id}`}</h3>
            <h2>{userFromServe?.name}</h2>
            <p>{userFromServe?.website}</p>
            <p className="user__contacts">
              {`Phone number: ${userFromServe?.phone}`}
              <span className="user__contacts-block">{`Email: ${userFromServe?.email}`}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
