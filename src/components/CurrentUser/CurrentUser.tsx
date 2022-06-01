import React from 'react';
import { useGetUserByIdQuery } from '../../store/apiWithRedux';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  clearSelectedUserId: () => void;
};

export const CurrentUser: React.FC<Props>
= React.memo(({ selectedUserId, clearSelectedUserId }) => {
  // eslint-disable-next-line max-len
  const { data, error } = useGetUserByIdQuery(String(selectedUserId), { pollingInterval: 0 });

  return (
    <>
      { !error && data ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {data.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {data.name}
          </h3>

          <p className="CurrentUser__email">
            {data.email}
          </p>

          <p className="CurrentUser__phone">
            {data.phone}
          </p>
          <button
            className="CurrentUser__btn-clear"
            type="button"
            onClick={clearSelectedUserId}
          >
            Clear
          </button>
        </div>
      )
        : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>Loading Error</span>
            </h2>

            <h3 className="CurrentUser__name">
              No user data
            </h3>
          </div>
        )}
    </>
  );
});
