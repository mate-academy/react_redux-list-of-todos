import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import {
  clearUser,
  setUserFailure,
  setUserStart,
  setUserSuccess,
} from '../../features/activeUser';

export const TodoModal: React.FC = () => {
  const [localLoading, setLocalLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const { user: currentUser, loading } = useSelector(
    (state: RootState) => state.currentUser,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentTodo) {
        return;
      }

      dispatch(setUserStart('loading user data'));
      setLocalLoading(true);
      setError(null);

      try {
        const user = await getUser(currentTodo.userId);

        dispatch(setUserSuccess(user));
      } catch (err) {
        const errorMessage = 'Error occurred while fetching user';

        dispatch(setUserFailure(errorMessage));
        setError(errorMessage);
      } finally {
        setLocalLoading(false);
      }
    };

    fetchUser();
  }, [currentTodo, dispatch]);

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
    dispatch(clearUser('user cleared'));
  };

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleCloseModal} />

      {(loading || localLoading) && <Loader />}

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
            onClick={handleCloseModal}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>
          {currentTodo.completed ? (
            <p className="block" data-cy="modal-user">
              <strong className="has-text-success">Done</strong>
              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          ) : (
            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">Planned</strong>
              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
