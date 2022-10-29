import React, { useEffect } from 'react';
import classNames from 'classnames';

import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { actions as todoActions } from '../../features/currentTodo';
import { actions as userActions } from '../../features/user';
import { useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo: Todo | null = useAppSelector<Todo | null>(
    state => state.currentTodo,
  );
  const currentUser: User | null = useAppSelector<User | null>(
    state => state.user,
  );

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId).then(fetchedUser => (
        dispatch(userActions.setUser(fetchedUser))
      ));
    }
  }, []);

  const handleCloseClick = () => {
    dispatch(todoActions.removeTodo());
    dispatch(userActions.removeUser());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser || !currentTodo ? (
        <Loader />
      ) : (
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
              onClick={handleCloseClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-danger': !currentTodo.completed,
                  'has-text-success': currentTodo.completed,
                })}
              >
                {currentTodo.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${currentUser.email}`}>
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
