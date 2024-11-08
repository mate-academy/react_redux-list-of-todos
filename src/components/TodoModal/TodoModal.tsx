import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/store';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [modalLoading, setModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setModalLoading(true);

    getUser(currentTodo.userId)
      .then(data => setUser(data))
      .finally(() => setModalLoading(false));
  }, [currentTodo]);

  const closeModal = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div
      className={classNames('modal', { 'is-active': !!currentTodo })}
      data-cy="modal"
    >
      <div className="modal-background" onClick={closeModal} />

      {modalLoading ? (
        <Loader />
      ) : currentTodo ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>
            <button
              onClick={closeModal}
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
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
                'Loading user...'
              )}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
