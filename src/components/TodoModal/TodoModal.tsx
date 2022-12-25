import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import {
  addUser,
  removeTodo, setError as userLoadError, setLoading as loadingUser,
} from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const {
    currentTodo, loading, user, error,
  } = useAppSelector(state => state.currentTodo);
  const closeTodo = () => {
    dispatch(removeTodo());
  };

  useEffect(() => {
    dispatch(loadingUser(true));

    if (currentTodo) {
      getUser(currentTodo?.userId)
        .then(todosFromServer => {
          dispatch(addUser(todosFromServer));
        })
        .catch(() => dispatch(userLoadError('Something went wrong')))
        .finally(() => dispatch(loadingUser(false)));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {error && (
        <div className="modal is-active is-clipped">
          <div className="modal-background" />
          <div className="modal-content">
            {error}
          </div>
          <button
            type="button"
            className="modal-close is-large"
            aria-label="close"
            onClick={closeTodo}
          />
        </div>
      )}

      {!loading && user && currentTodo && !error && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodo}
              aria-label="close modal"
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block"
              data-cy="modal-title"
            >
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
