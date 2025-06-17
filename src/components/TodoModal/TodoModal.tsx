/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useSelector((state: RootState) => {
    return state.currentTodo as Todo;
  });
  const dispatch = useDispatch();

  if (!currentTodo) {
    return null;
  }

  const { id, title, completed, userId } = currentTodo;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(userFromServer =>
      setUser({
        id: userFromServer.id,
        name: userFromServer.name,
        email: userFromServer.email,
        phone: userFromServer.phone,
      }),
    );
  }, [userId]);

  const name = user?.name;
  const email = user?.email;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
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
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
