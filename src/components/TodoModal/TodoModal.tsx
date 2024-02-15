import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const onClose = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    setLoading(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setSelectedUser)
        .catch(() => setErrorMessage('Cannot find a user'))
        .finally(() => setLoading(false));
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
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
              onClick={onClose}
            />
          </header>

          {errorMessage ? (
            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {errorMessage}
              </p>
            </div>
          ) : (
            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>
              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}

                {currentTodo?.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}

                {' by '}

                <a href={`mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
