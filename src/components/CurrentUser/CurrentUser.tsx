import React from 'react';
import { useDispatch } from 'react-redux';

import './CurrentUser.scss';
import { clearSelectedUser } from '../../store';
// import { UserInterface } from '../../components/interfaces';

// interface Props {
//   user: UserInterface;
// }

// export const CurrentUser = ({ user }: Props) => {
  export const CurrentUser = ({ user }: any) => {
  const { id, name, email, phone } = user;
  const dispatch = useDispatch();

  const clearUser = () => {
    dispatch(clearSelectedUser());
  };

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${id}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>

      <button
        className="CurrentUser__clear button"
        type="submit"
        onClick={clearUser}
      >
        Clear
      </button>
    </div>
  )
}
