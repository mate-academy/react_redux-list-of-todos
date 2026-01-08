import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/index';
import { useAppSelector } from '../../app/index';
import { setClose, setUser, setUserLoading } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, todo, user, isLoading } = useAppSelector(
    status => status.currentTodo,
  );

  useEffect(() => {
    if (!todo) {
      return;
    }

    (async () => {
      try {
        dispatch(setUserLoading(true));

        const person = await getUser(todo.userId);

        dispatch(setUser(person));
      } finally {
        dispatch(setUserLoading(false));
      }
    })();
  }, [todo, dispatch]);

  if (!isOpen || !todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={() => dispatch(setClose())} />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head" data-cy="modal-header">
          <div className="modal-card-title">{`Todo #${todo.id}`}</div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(setClose())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p data-cy="modal-user">
            {todo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {user && (
              <>
                {' '}
                by <a href={`mailto:${user.email}`}>{user.name}</a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
