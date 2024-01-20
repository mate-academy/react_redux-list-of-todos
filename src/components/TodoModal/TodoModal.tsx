import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const { removeTodo } = actions;
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoader(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .catch(() => setError(true))
        .finally(() => setLoader(false));
    }
  }, [currentTodo]);

  const closeModal = () => {
    dispatch(removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      {loader
        ? (<Loader />)
        : (
          <>
            <div className="modal-background" />
            {error
              && (
                <div className="modal-card">
                  <p className="modal-card-title">Something went wrong</p>
                </div>
              )}

            {(currentTodo && !loader && !error)
              && (
                <div className="modal-card">
                  <header className="modal-card-head">
                    <div
                      className="modal-card-title has-text-weight-medium"
                      data-cy="modal-header"
                    >
                      {`Todo #${currentTodo.id}`}
                    </div>

                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      data-cy="modal-close"
                      onClick={closeModal}
                    />
                  </header>

                  <div className="modal-card-body">
                    <p className="block" data-cy="modal-title">
                      {currentTodo.title}
                    </p>

                    <p className="block" data-cy="modal-user">
                      {currentTodo.completed
                        ? <strong className="has-text-success">Done</strong>
                        : <strong className="has-text-danger">Planned</strong>}

                      {' by '}

                      <a href={`mailto:${user?.email}`}>
                        {user?.name}
                      </a>
                    </p>
                  </div>
                </div>
              )}
          </>
        )}
    </div>
  );
};
