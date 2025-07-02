import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import cn from 'classnames';

type Props = {
  todo: Todo | null;
  onClose: () => void;
  loading?: boolean;
  user: User | null;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose,
  loading,
  user,
}) => {
  if (!todo) {
    return null;
  }

  return (
    <div className={cn('modal', { 'is-active': !!todo })} data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={cn({
                  'has-text-success': todo?.completed,
                  'has-text-danger': !todo?.completed,
                })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by'}
              <a href={`mailto:${user?.email ?? ''}`}> {user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
