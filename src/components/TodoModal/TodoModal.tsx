import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const findUser = async (userId: number) => {
    try {
      const respone = await getUser(userId);

      setUser(respone);
    } catch {
      setError("We don't have this user");
    }
  };

  const handleCloseModal = () => {
    dispatch(actions.removeTodo());
  };

  useEffect(() => {
    findUser(currentTodo?.userId as number);
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error && !user && (
        <div className="modal-card notification is-danger">
          <header
            className="modal-card-head notification is-danger"
            style={{ border: '0' }}
          >
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {error}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>
        </div>
      )}

      {!error && !user && (
        <div className="modal-card">
          <Loader />
        </div>
      )}
      {!error && user && (
        <div className="modal-card">
          <>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!currentTodo?.completed ? (
                  <strong className="has-text-danger">Planned</strong>
                ) : (
                  <strong className="has-text-success">Done</strong>
                )}
                {' by '}
                <a href="mailto:Sincere@april.biz">{user?.name}</a>
              </p>
            </div>
          </>
        </div>
      )}
    </div>
  );
};
