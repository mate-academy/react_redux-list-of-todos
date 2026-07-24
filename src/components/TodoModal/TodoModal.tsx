import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setUser(null);
    setLoading(true);

    getUser(currentTodo.userId)
      .then(response => {
        setUser(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

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
              Todo #{currentTodo.id}
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
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': currentTodo.completed,
                  'has-text-danger': !currentTodo.completed,
                })}
              >
                {currentTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
