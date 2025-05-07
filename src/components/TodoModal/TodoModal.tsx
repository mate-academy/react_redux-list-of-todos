import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentTodo } from '../../features/currentTodo';
import { clearCurrentUser, setCurrentUser } from '../../features/currentUser';

import { Loader } from '../Loader';
import { getUser } from '../../api';

export const TodoModal: React.FC = ({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();

  const currentTodo = useSelector(state => state.currentTodo);
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => {
    if (currentTodo) {
      setLoading(true);
      getUser(currentTodo.userId)
        .then(user => {
          dispatch(setCurrentUser(user));
        })
        .catch(() => {
          dispatch(clearCurrentUser());
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      dispatch(clearCurrentUser());
    };
  }, [currentTodo, dispatch, setLoading]);

  const handleClose = () => {
    dispatch(clearCurrentTodo());
    dispatch(clearCurrentUser());
  };

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
