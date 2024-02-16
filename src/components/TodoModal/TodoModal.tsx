import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as CurrentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  if (!todo) {
    throw new Error('wrong todo to choose');
  }

  useEffect(() => {
    getUser(todo.userId).then(result => setUser(result));
  }, [todo]);

  return (
    <div
      className={classNames('modal', { 'is-active': todo !== null })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {user
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  dispatch(CurrentTodoActions.removeTodo());
                  setUser(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo?.title}</p>

              <p className="block" data-cy="modal-user">
                {
                  todo?.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }
                {' by '}
                <a href={user.email}>{user.name}</a>
              </p>
            </div>
          </div>
        )
        : <Loader />}
    </div>
  );
};
