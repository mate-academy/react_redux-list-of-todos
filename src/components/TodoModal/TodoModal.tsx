import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader/Loader';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);
      setLoadingUser(false);

      return;
    }

    setUser(null);
    setLoadingUser(true);

    getUser(currentTodo.userId).then(fetchedUser => {
      setUser(fetchedUser);
      setLoadingUser(false);
    });
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head" data-cy="modal-header">
          <p className="modal-card-title">Todo #{currentTodo.id}</p>
          <button
            className="delete"
            aria-label="close"
            data-cy="modal-close"
            onClick={() => dispatch(setCurrentTodo(null))}
          />
        </header>

        <section className="modal-card-body">
          <p data-cy="modal-title">{currentTodo.title}</p>

          {loadingUser ? (
            <Loader />
          ) : (
            user && (
              <p data-cy="modal-user">
                {currentTodo.completed ? 'Done by ' : 'Planned by '}
                {user.name}
              </p>
            )
          )}
        </section>
      </div>
    </div>
  );
};
