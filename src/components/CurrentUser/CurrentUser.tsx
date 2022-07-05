import { useSelector } from 'react-redux';
import React from 'react';
import store, { actions, selectors } from '../../store';
import './CurrentUser.scss';

export const CurrentUser: React.FC = React.memo(
  () => {
    const user = useSelector(selectors.getUser);

    const removeUser = () => {
      store.dispatch(actions.setUser(null));
    };

    return (
      <div className="CurrentUser">
        {user ? (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.website}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button CurrentUser__clear"
              onClick={removeUser}
            >
              Clear
            </button>
          </>
        ) : (
          <h2 className="CurrentUser__title">
            <span>
              Waiting for user...
            </span>
          </h2>
        )}

      </div>
    );
  },
);
