/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();

  const [isModalLoading, setIsModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      setIsModalLoading(true);

      getUser(currentTodo.userId)
        .then((loadedUser: User) => {
          setUser(loadedUser);
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setTimeout(() => {
            setIsModalLoading(false);
          }, 500);
        });
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(clearCurrentTodo())}
      />

      {isModalLoading ? (
        <Loader />
      ) : (
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
              onClick={() => dispatch(clearCurrentTodo())}
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
              {user ? (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              ) : (
                <span>Unknown User</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
