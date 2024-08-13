import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { clearTodo } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const closeModal = () => dispatch(clearTodo(null));

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUser(currentTodo.userId);

        setCurrentUser(user);
      } catch {
        throw new Error("Can't load the user");
      }
    }

    fetchUser();
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
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
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
