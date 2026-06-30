import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodo } from '../../features/currentTodo';

type Props = {
  loading: boolean;
  user: User | null;
};

export const TodoModal: React.FC<Props> = ({ loading, user }) => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setSelectedTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-danger">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {/* <strong className="has-text-success">Done</strong> */}

              {' by '}

              {user && <a href={`mailto:${user?.email}`}>{user?.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
