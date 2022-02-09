import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import classNames from 'classnames';
import { getUser } from '../../Api/Api';
import './CurrentUser.scss';

export const CurrentUser = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const selectedUserId = useSelector((state: RootState) => state.selectedUserId);

  useEffect(() => {
    (async () => {
      const userFromServer = await getUser(selectedUserId);

      dispatch({ type: 'LOAD_USER', payload: userFromServer });
    })();
  }, [selectedUserId]);

  const clearHandler = () => {
    dispatch({ type: 'SET_SELECTED_USER_ID', payload: 0 });
  };

  const {
    id,
    email,
    name,
    phone,
  } = user;

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>

      <button
        className="CurrentUser__clear"
        type="button"
        onClick={clearHandler}
      >
        Clear
      </button>
    </div>
  );
};
