import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import classNames from 'classnames';
import { clearCurrentTodo } from '../../features/currentTodo';
import { setUser } from '../../features/user';

export const TodoModal: React.FC = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const selectTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    if (!selectTodo?.userId) {
      return;
    }

    getUser(selectTodo?.userId)
      .then(fetchedUser => dispatch(setUser(fetchedUser)))
      .finally(() => setLoadingUser(false));
  }, [selectTodo, dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser && <Loader />}

      {selectTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodo.completed === true ? (
                <strong
                  className={classNames('block', {
                    'has-text-success': selectTodo.completed === true,
                  })}
                >
                  Done
                </strong>
              ) : (
                <strong
                  className={classNames('block', {
                    'has-text-danger': selectTodo.completed === false,
                  })}
                >
                  Planned
                </strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
