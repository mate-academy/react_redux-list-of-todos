import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../api/api';
import { selectedUser } from '../../redux/reducers/todos/selectors';
import { TodosActionCreators }
  from '../../redux/reducers/todos/action-creators';
import { User } from '../../types/User';
import './CurrentUser.scss';

export const CurrentUser: React.FC = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(selectedUser);
  const [userDetail, setUserDetail] = useState<User>();

  useEffect(() => {
    getUserDetails(selectedUserId)
      .then((data) => setUserDetail(data));
  }, [selectedUserId]);

  const removeSelectedUser = () => {
    dispatch(TodosActionCreators.setSelectedUser(null));
  };

  return (
    <div className="CurrentUser">
      {userDetail && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${userDetail.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {userDetail.name}
          </h3>
          <p className="CurrentUser__email">
            {userDetail.email}
          </p>
          <p className="CurrentUser__phone">
            {userDetail.phone}
          </p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={() => removeSelectedUser()}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
};
