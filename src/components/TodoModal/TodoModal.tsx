import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo.userId)
      .then(setSelectedUser);
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        !selectedUser
          ? <Loader />
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo?.id}`}
                </div>

                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  aria-label="button"
                  onClick={() => dispatch(actions.removeTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    selectedTodo?.completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }

                  {' by '}

                  <a href={selectedUser?.email}>
                    {selectedUser?.name}
                  </a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
