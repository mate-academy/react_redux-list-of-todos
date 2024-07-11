import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { currentUserSlice } from '../../features/currentUser';

type Props = {
  selectedUserId: number | null;
};

export const TodoModal: React.FC<Props> = ({ selectedUserId }) => {
  const dispatch = useDispatch();

  const handleSelectTodo = (currentTodo: Todo | null) =>
    dispatch(currentTodoSlice.actions.setCurrentTodo(currentTodo));

  const handleSelectUser = (currentUser: Todo | null) =>
    dispatch(currentUserSlice.actions.setCurrentUser(currentUser));

  const selectedTodo = useAppSelector(state => state.currentTodo);

  const selectedUser = useAppSelector(state => state.currentUser);

  useEffect(() => {
    if (selectedUserId) {
      getUser(selectedUserId).then(currentUser => {
        dispatch(currentUserSlice.actions.setCurrentUser(currentUser));
      });
    }
  }, [dispatch, selectedUserId]);

  const handleModalClose = () => {
    handleSelectUser(null);
    handleSelectTodo(null);
  };

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
              {`Todo #${selectedTodo?.id}`}
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
              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
