import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

interface Props {
  user: User | null;
  isLoading: boolean;
}

export const TodoModal: React.FC<Props> = ({ user, isLoading }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const closeWindow = () => {
    dispatch(currentTodoSlice.actions.remove());
  };

  if (!currentTodo) {
    return;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeWindow}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
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
