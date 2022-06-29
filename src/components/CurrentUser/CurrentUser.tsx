import React from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { removeSelectedUser } from '../../store/actions';

type Props = {
  setUserId: (id: number) => void
};

export const CurrentUser: React.FC<Props> = ({ setUserId }) => {
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();

  if (!user) {
    return <p>No selected user</p>;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        type="button"
        className="
          button"
        onClick={() => {
          dispatch(removeSelectedUser());
          setUserId(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
