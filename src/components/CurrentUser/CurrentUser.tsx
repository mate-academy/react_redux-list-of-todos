import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../store/actions';
import { getErrorSelector } from '../../store/selectors';

type Props = {
  user: User | null,
};

export const CurrentUser: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { user } = props;
  const isError = useSelector(getErrorSelector);

  const handleClearUser = async () => {
    dispatch(loadUserAction(null));
  };

  return (
    <>
      {!isError
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
            <button
              type="button"
              className="button"
              onClick={handleClearUser}
            >
              Clear User
            </button>
          </div>
        )
        : <p>User Not Found</p>}
    </>
  );
};
