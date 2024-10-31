import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentTodo, selectedTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const todoModal = useSelector(selectedTodo);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingModal, setIsLoadingModal] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingModal(true);
    getUser(todoModal!.userId)
      .then(us => setUser(us))
      .finally(() => setIsLoadingModal(false));
  }, [todoModal]);

  const handleCloseTodo = () => {
    dispatch(deleteCurrentTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todoModal?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                handleCloseTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todoModal?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!todoModal?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {todoModal?.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
