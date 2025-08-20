import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { getUser } from '../../api';
import { setUser } from '../../features/currentUserSlice';
import { setTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo) || undefined;
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    getUser(todo?.userId || 0)
      .then(user => {
        dispatch(setUser(user));
      })
      .catch(() => {
        setUserInfo(true);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [dispatch, todo?.userId]);

  const currentUser = useAppSelector(state => state.currentUser);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userInfo && <p>Sorry, there is no user</p>}

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(setTodo(null));
                dispatch(setUser(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
