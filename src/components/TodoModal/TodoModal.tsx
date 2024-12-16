import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import classNames from 'classnames';
import { actions as userActions } from '../../features/user';

interface Props {
  currentTodo: Todo;
}

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const { id, title, completed, userId } = currentTodo;
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(userActions.setLoading(true));
    getUser(userId)
      .then(userFromServer => dispatch(userActions.setUser(userFromServer)))
      .catch(() => {
        dispatch(userActions.setError('Error'));
      })
      .finally(() => {
        dispatch(userActions.setLoading(false));
      });
  }, [dispatch, userId]);

  const onTodoClose = () => {
    dispatch(currentTodoActions.clearTodo());
  };

  if (!currentTodo) {
    return <Loader />;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onTodoClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
