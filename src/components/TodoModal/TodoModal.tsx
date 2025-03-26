import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsModalLoading(true);

    if (!currentTodo) {
      return;
    }

    getUser(currentTodo.userId)
      .then(data => setUser({ ...data }))
      .finally(() => setIsModalLoading(false));
  }, [currentTodo]);

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div
      className={classNames('modal', { 'is-active': currentTodo?.id !== 0 })}
      data-cy="modal"
    >
      <div className="modal-background" />
      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
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
