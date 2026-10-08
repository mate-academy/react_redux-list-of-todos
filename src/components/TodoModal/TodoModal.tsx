import React from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import classNames from 'classnames';
import { User } from '../../types/User';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  user?: User;
  isLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({ user, isLoading }) => {
  const Todo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  if (Todo === null) {
    return;
  }

  return (
    <div
      className={classNames(Todo ? 'modal is-active' : 'modal')}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isLoading || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{Todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoSlice.actions.clearPost(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {Todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {Todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
