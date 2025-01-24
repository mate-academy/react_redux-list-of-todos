import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function findUser() {
      if (selectedTodo) {
        try {
          const content = await getUser(selectedTodo.userId);

          setUser(content);
        } catch (error) {
          alert('There is no information try again');
        }
      }
    }

    findUser();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && <Loader />}

      {user !== null && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(clearCurrentTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
