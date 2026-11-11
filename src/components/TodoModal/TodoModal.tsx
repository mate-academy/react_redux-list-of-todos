import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { clearTodo, setLoading, setUser } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();

  const { todo, isLoading, user } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (todo && todo.userId) {
      dispatch(setLoading(true));
    }

    if (!todo || typeof todo.userId !== 'number') {
      return;
    }

    getUser(todo?.userId)
      .then(userData => {
        dispatch(setUser(userData));
      })
      .catch(() => {
        dispatch(setUser(null));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [todo, dispatch]);

  if (!todo && !isLoading) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {todo ? `Todo #${todo.id}` : 'Loading...'}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>

        <div className="modal-card-body">
          {isLoading ? (
            <Loader />
          ) : (
            <>
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
                <a href={`mailto:${user?.email}`}>
                  {user ? user.name : `User ${todo?.userId}`}
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
