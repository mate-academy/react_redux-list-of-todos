import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { selectTodo } from '../../features/currentTodo';

import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

interface Props {
  setErr: (err: string) => void;
}

export const TodoModal: React.FC<Props> = ({ setErr }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo.item,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      setSelectedUser(null);
      setErr('');

      getUser(selectedTodo.userId)
        .then(setSelectedUser)
        .catch(() => {
          setErr('Unable to load user');
        });
    } else {
      setSelectedUser(null);
      setErr('');
    }
  }, [selectedTodo, setErr]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(selectTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
