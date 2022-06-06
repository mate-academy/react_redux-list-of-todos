import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api/api';
import { selectUserId } from '../../store/actions';
import { getUserIdSelector } from '../../store/selectors';
import { User } from '../../store/types';
import './CurrentUser.scss';

export const CurrentUser: React.FC
= () => {
  const [user, setUser] = useState<User | null>(null);
  const [errorText, setErrorText] = useState('');

  const selectedUserId = useSelector(getUserIdSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    getUser(selectedUserId)
      .then(userFromServer => setUser(userFromServer))
      .catch((error) => setErrorText(error.toString()));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span data-cy="userButton">
              Selected user:
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>
          <button
            className={classnames(
              'TodoList__user-button',
              {
                'TodoList__user-button--selected':
                  user.id === selectedUserId,
              },
              'button',
            )}
            type="button"
            onClick={() => dispatch(selectUserId(0))}
          >
            Clear
          </button>
        </>
      ) : (
        <p>{errorText}</p>
      )}
    </div>
  );
};
