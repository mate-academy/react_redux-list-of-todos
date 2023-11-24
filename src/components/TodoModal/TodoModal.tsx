import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useAppSelector(state => state.currentTodo);

  const [isLoading, setIsLoading] = useState(false);
  const [isAnyUserActive, setIsAnyUserActive] = useState<User | null>(null);
  const [hasErrorMessage, setHasErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setHasErrorMessage('');

    if (selected) {
      getUser(selected.userId)
        .then(setIsAnyUserActive)
        .catch(() => setHasErrorMessage('Smt went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [selected, selected?.userId]);

  const closeTodoInfo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!!isAnyUserActive && !isLoading && !hasErrorMessage && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selected?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeTodoInfo()}
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block"
              data-cy="modal-title"
            >
              {selected?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selected?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${isAnyUserActive?.email}`}>
                {isAnyUserActive.name}
              </a>
            </p>
          </div>
        </div>
      )}

      {hasErrorMessage && <ErrorNotification errorMessage={hasErrorMessage} />}
    </div>
  );
};
