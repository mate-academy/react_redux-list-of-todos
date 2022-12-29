import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentActions } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  if (!todo) {
    throw new Error('Can`t find todo');
  }

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch(() => {
        throw new Error('Can`t find user');
      });
  }, [todo]);

  const removeTodo = () => dispatch(currentActions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-success': completed,
                'has-text-danger': !completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
