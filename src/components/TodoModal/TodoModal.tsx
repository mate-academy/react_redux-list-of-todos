import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { currentUserSlice } from '../../features/currentUser';
// import { Todo } from '../../types/Todo';
type TodoModalProps = {
  openInfo: boolean;
  setOpenInfo: (val: boolean) => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  setOpenInfo,
  openInfo,
}) => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const user = useAppSelector(state => state.currentUser);

  const closeModal = () => {
    dispatch(currentTodoSlice.actions.closeModal());
    dispatch(currentUserSlice.actions.closeActiveUser());
    setOpenInfo(false);
  };

  return (
    <div className={`modal ${openInfo ? 'is-active' : ''}`} data-cy="modal">
      <div className="modal-background" />
      {todo === null ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
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
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
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
