import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [userInModal, setUserInModal] = useState<User | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => {
    setIsModal(false);
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    if (currentTodo) {
      setIsModal(true);
      setIsLoading(true);
      getUser(currentTodo.userId).then(user => {
        setUserInModal(user);
        setIsLoading(false);
      });
    }
  }, [currentTodo]);

  return (
    isModal && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {isLoading && <Loader />}

        {currentTodo && !isLoading && (
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
                {currentTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {' by '}
                <a href={`mailto:${userInModal?.email}`}>{userInModal?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
