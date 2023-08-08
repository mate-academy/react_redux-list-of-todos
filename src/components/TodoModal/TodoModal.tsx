import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const {
    id,
    title,
    completed,
    userId,
  } = currentTodo || { title: '', completed: false, userId: 0 };

  const { name, email } = user || { name: '', email: '' };

  const removeTodod = () => dispatch(actions.removeTodo());

  const loadUser = async (UsId: number) => {
    const newUser = await getUser(UsId);

    setUser(newUser);
  };

  useEffect(() => {
    loadUser(userId);
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user
        ? (<Loader />)
        : (
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
                onClick={removeTodod}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{title}</p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>
                  )}

                {' by '}
                <a href={`mailto:${email}`}>{name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
