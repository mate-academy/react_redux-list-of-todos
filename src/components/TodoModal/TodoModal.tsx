import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { selector } from '../../app/store';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';
import { User } from '../../types/User';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = selector(state => state.currentTodo);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser)
        .finally(() => setLoader(false));
    }
  }, [currentTodo, dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader && <Loader />}

      {!loader && (
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
