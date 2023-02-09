/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [didload, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const dispatch = useAppDispatch();
  const {
    userId,
    completed,
    id,
    title,
  } = useAppSelector(state => state.currentTodo) as Todo;

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
        setLoaded(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const showTodoInfo = !isLoading && !hasError && didload;

  const closeModal = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {showTodoInfo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block"
              data-cy="modal-title"
            >
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>)}
              {' by '}
              <a
                href={`mailto:${user?.email}`}
              >
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block has-text-danger"
            >
              User is not found!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
