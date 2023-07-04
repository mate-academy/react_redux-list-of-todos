import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const {
    id,
    title,
    completed,
    userId,
  } = useAppSelector(state => state.currentTodo) || {
    id: 0, title: '', completed: false, userId: 0,
  };
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const { name, email } = user || { name: '', email: '' };

  const loadUser = async () => {
    const userData = await getUser(userId);

    setUser(userData);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleModalClose = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  const isLoading = user === null;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
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
                onClick={handleModalClose}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{title}</p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}
                {' by '}
                <a href={`mailto:${email}`}>{name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
