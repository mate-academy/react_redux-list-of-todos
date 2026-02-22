import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import type { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);
      return;
    }

    setIsLoadingUser(true);

    getUser(currentTodo.userId)
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, [currentTodo]);

  const close = () => dispatch(clearCurrentTodo());

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close} />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{`Todo #${currentTodo.id}`}</p>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" onClick={close} />
        </header>

        <section className="modal-card-body">
          {isLoadingUser ? (
            <Loader />
          ) : (
            <>
              <p className="mb-4">{currentTodo.title}</p>

              <p>
                {currentTodo.completed ? (
                  <span className="tag is-success">Done</span>
                ) : (
                  <span className="tag is-warning">Planned</span>
                )}
                {' by '}
                <strong>{user?.name ?? 'Unknown'}</strong>
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
