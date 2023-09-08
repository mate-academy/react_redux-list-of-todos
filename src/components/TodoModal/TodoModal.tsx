import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setTempUser)
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);
  const onClosingModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && !error && <Loader />}
      {!isLoading && !error && selectedTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClosingModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${tempUser?.email}`}>{tempUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
