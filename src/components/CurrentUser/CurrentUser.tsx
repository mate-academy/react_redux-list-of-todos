import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { actions as actionsSelectedUser } from '../../store/selectedUser';
import { User } from '../../types/user';
import './CurrentUser.scss';

type Props = {
  user: User | null;
};

export const CurrentUser: FC<Props> = ({ user }) => {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(actionsSelectedUser.clearUser());
  };

  return (
    <>
      {user ? (
        <div className="User">
          <div className="UserSelectedInfo">
            Selected user:
            {user.id}
          </div>
          <div className="UserBody">
            <div className="UserName">
              Name:&ensp;
              {user.name}
            </div>
            <div className="UserMail">
              Email:&ensp;
              {user.email}
            </div>
            <div className="UserPhone">
              Phone:&ensp;
              {user.phone}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      ) : <div className="User">User not selected</div>}
    </>
  );
};
