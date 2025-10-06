import React from 'react';
import { Loader } from '../Loader';
import { clearUser } from '../../features/userSlice';
import { clearCurrentTodo } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  isLoading: string | null;
};

export const TodoModal: React.FC<Props> = ({ isLoading }) => {
  const user = useAppSelector(state => state.user);
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {(!todo || !user || isLoading === 'modal') && <Loader />}

        {!isLoading && todo && user && (
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
                onClick={() => {
                  dispatch(clearUser());
                  dispatch(clearCurrentTodo());
                }}
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
    </>
  );
};
