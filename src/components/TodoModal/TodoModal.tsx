import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useAppSelector(state => state.currentTodo);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    if (selected) {
      getUser(selected.userId)
        .then(setUser)
        .catch(() => setErrorMessage('Smt went wrong'))
        .finally(() => setLoading(false));
    }
  }, [selected, selected?.userId]);

  const closeTodoInfo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!!user && !loading && !errorMessage && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {selected ? `Todo #${selected.id}` : ''}
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
              {selected?.title || ''}
            </p>

            <p className="block" data-cy="modal-user">
              {selected ? (
                <strong className={selected.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {selected.completed ? 'Done' : 'Planned'}
                </strong>
              ) : null}

              {user ? (
                <>
                  {' by '}
                  <a href={`mailto:${user?.email}`}>
                    {user.name}
                  </a>
                </>
              ) : null}
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <p className="notification is-danger">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
