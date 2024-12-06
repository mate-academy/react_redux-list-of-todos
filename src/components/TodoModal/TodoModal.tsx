import React, { useRef } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  selectedTodo: Todo | null;
  selectedUser: User | null;
  isLoadingUser: boolean;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const TodoModal: React.FC<Props> = ({
  isLoadingUser,
  selectedTodo,
  selectedUser,
  setSelectedUser,
}) => {
  const modal = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setSelectedUser(null);
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));
  };

  return (
    <div
      ref={modal}
      className={`modal ${selectedTodo ? 'is-active' : ''}`}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isLoadingUser && <Loader />}

      {!isLoadingUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClose}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!selectedTodo?.completed && (
                <>
                  <strong className="has-text-danger">Planned</strong>
                  {' by '}
                  <a href={`mailto:${selectedUser?.email}`}>
                    {selectedUser?.name}
                  </a>
                </>
              )}

              {selectedTodo?.completed && (
                <>
                  <strong className="has-text-success">Done</strong>
                  {' by '}
                  <a href={`mailto:${selectedUser?.email}`}>
                    {selectedUser?.name}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
