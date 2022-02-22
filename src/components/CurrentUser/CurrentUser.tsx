import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from '../../store/selectors';
import { getUser } from '../../api/user';
import { loadUserAction } from '../../store/actions';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const params = useParams();

  const loadUserFromServer = async () => {
    if (params.userId) {
      const userFromServer = await getUser(+params?.userId);

      dispatch(loadUserAction(userFromServer));
    }
  };

  useEffect(() => {
    if (!user) {
      loadUserFromServer();
    }
  }, []);

  if (!user) {
    return (
      <div>No selected user</div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  );
};
