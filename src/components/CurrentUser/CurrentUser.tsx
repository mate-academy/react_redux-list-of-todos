import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser, userData } from '../../store';
import './CurrentUser.scss';

type Props = {
  onClear: (id: undefined) => void;
  userId: number | undefined;
};

const CurrentUser: React.FC<Props> = ({
  onClear,
  userId,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(userData);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user?.name}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">
        {user?.name}
      </h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        type="button"
        className="button is-primary is-fullwidth mt-5"
        onClick={() => {
          onClear(undefined);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default CurrentUser;
