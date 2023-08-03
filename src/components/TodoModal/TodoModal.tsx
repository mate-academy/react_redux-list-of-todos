import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { removeTodo } = actions;

  const handleRemoveCurrentTodo = () => dispatch(removeTodo());

  useEffect(() => {
    if (currentTodo) {
      setIsProcessing(true);
      getUser(currentTodo.userId)
        .then(response => setCurrentUser(response))
        .finally(() => setIsProcessing(false));
    }
  }, [currentTodo]);

  return (
    <div
      className={classNames(
        'modal',
        { 'is-active': currentTodo },
      )}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isProcessing
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="close"
                onClick={handleRemoveCurrentTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!currentTodo?.completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>}

                {' by '}
                <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
              </p>
            </div>
          </div>
        )}

    </div>
  );
};
