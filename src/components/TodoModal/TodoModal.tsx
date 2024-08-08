import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUser } from '../../api';

import { selector } from '../../app/store';

import { User } from '../../types/User';

import { setCurrentTodo } from '../../features';

import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = selector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo, dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setCurrentTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!currentTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {currentTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
