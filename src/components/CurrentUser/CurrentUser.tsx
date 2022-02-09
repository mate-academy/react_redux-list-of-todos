import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../Api/Api';
import './CurrentUser.scss';

export const CurrentUser = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const selectedUserId = useSelector((state: RootState) => state.selectedUserId);

  useEffect(() => {
    (async () => {
      let userFromServer;
      let serverError = false;

      try {
        userFromServer = await getUser(selectedUserId);
      } catch (error) {
        const str = 'An error has ocurred while getting data from server, please contact our support team';

        serverError = true;
        dispatch({ type: 'SET_USER_ERROR', payload: str });
      }

      if (!serverError) {
        dispatch({ type: 'LOAD_USER', payload: userFromServer });
      }
    })();
  }, [selectedUserId]);

  const clearHandler = () => {
    dispatch({ type: 'SET_SELECTED_USER_ID', payload: 0 });
  };

  const userLoader = () => {
    const {
      id, name, email, phone,
    } = user;

    if (id !== selectedUserId) {
      return (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              The data is loading
            </span>
          </h2>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          className="CurrentUser__clear button"
          type="button"
          onClick={clearHandler}
        >
          Clear
        </button>
      </div>
    );
  };

  return (
    <>
      {userLoader()}
    </>
  );
};
