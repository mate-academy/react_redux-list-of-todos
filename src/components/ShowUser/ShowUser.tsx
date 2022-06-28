import React from 'react';
import './ShowUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { showUserFromServer } from '../../store/actions';
import { showUserSelector } from '../../store/selectors';

export const ShowUser: React.FC = () => {
  const user = useSelector(showUserSelector);
  const dispatch = useDispatch();

  return (
    <div className="box is-two-thirds column m-4">
      <div className="user__block box is-half m-auto">
        <div className="user">
          {user === null ? (
            <p>No user selected</p>
          )
            : (
              <>
                {user && (
                  <>
                    <h2 className="user__title"><span>{`Selected user: ${user?.id}`}</span></h2>

                    <h3 className="user__username">
                      {user.username}
                    </h3>
                    <h2
                      className="user__name"
                      data-cy="userName"
                    >
                      {user.name}
                    </h2>
                    <p className="user__email">{user.email}</p>
                    <p className="user__phone">{user.phone}</p>
                    <button
                      className="user__clear button is-info is-rounded"
                      type="button"
                      onClick={() => (dispatch(showUserFromServer(null)))}
                    >
                      Clear
                    </button>
                  </>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  );
};
