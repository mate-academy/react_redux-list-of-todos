import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector((state: RootState) => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    getUser(todo?.userId || 0)
      .then(data => setUser(data))
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  }, []);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
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
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              <strong
                className={classNames(
                  'is-vcentered is-expanded',
                  todo.completed ? 'has-text-success' : 'has-text-danger',
                )}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {/* For completed */}
              {/* <strong className="has-text-success">Done</strong> */}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
