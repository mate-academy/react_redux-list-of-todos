import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  setOpenTodoId: (id: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({ setOpenTodoId }) => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const onClose = () => {
    setOpenTodoId(null);
    setSelectedUser(null);
    dispatch(clearCurrentTodo());
  };

  useEffect(() => {
    if (!currentTodo) {
      return;
    }

    setUserLoading(true);
    getUser(currentTodo.userId)
      .then(setSelectedUser)
      .finally(() => {
        setUserLoading(false);
      });
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">
                {currentTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
