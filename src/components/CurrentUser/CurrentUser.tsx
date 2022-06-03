import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GetEndpoint } from '../../api';
import { getSelectUserIdSelector, setSelectUserId } from '../../store';

export const CurrentUser: React.FC = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', phone: '' });

  const userId = useSelector(getSelectUserIdSelector);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    const userInfo = await GetEndpoint(`users/${userId}`);

    setUser(userInfo);
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <button
          className="CurrentUser__button button"
          type="button"
          onClick={() => dispatch(setSelectUserId(0))}
        >
          Reset Users
        </button>
        <span>
          Selected user:
          {' '}
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
