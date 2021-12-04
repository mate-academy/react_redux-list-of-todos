import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { actions as actionsUser } from '../../store/selectedUser';

import './CurrentUser.scss';

export const CurrentUser = () => {
  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const dispatch = useDispatch();
  const setUser = (user: User | null) => {
    dispatch(actionsUser.setUser(user));
  };

  if (!selectedUser) {
    return (
      <div className="CurrentUser">
        <h3 className="CurrentUser__name">User not found</h3>
        <button
          className="CurrentUser__button"
          type="button"
          onClick={() => setUser(null)}
        >
          Remove a choice
        </button>
      </div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        {`Selected user: ${selectedUser.id}`}
      </h2>

      <h3 className="CurrentUser__name">
        {selectedUser.name}
      </h3>
      <p className="CurrentUser__email">
        {selectedUser.email}
      </p>
      <p className="CurrentUser__phone">
        {selectedUser.phone}
      </p>
      <button
        className="CurrentUser__button"
        type="button"
        onClick={() => setUser(null)}
      >
        Remove a choice
      </button>
    </div>
  );
};
