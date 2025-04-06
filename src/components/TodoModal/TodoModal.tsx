import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { clearCurrentTodo } from '../../features/currentTodo';

type Props = {
  resetTodoClickedState: () => void;
};

export const TodoModal: React.FC<Props> = ({ resetTodoClickedState }) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [userSt, setUserSt] = useState<User | null>(null);

  const dispatch = useDispatch();
  const checkedTodo = useSelector((state: RootState) => state.currentTodo);

  useEffect(() => {
    setLoadingModal(true);
    if (checkedTodo !== null) {
      getUser(checkedTodo.userId)
        .then(setUserSt)
        .finally(() => setLoadingModal(false));
    }
  }, [checkedTodo]);

  const handleClose = () => {
    dispatch(clearCurrentTodo());
    resetTodoClickedState();
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${checkedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {checkedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {checkedTodo?.completed === true ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${userSt?.email}`}>{userSt?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
