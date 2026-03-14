import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../hooks';
import classNames from 'classnames';
import { User } from '../../types/User';

interface Props {
  close: () => void;
  user: User | null;
}
export const TodoModal: React.FC<Props> = ({ close, user }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  if (!currentTodo) {
    return null;
  }

  return (
    <>
      <div
        className={classNames('modal', { ['is-active']: !!currentTodo })}
        data-cy="modal"
      >
        <div className="modal-background" />
        {!user ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                onClick={close}
                type="button"
                className="delete"
                data-cy="modal-close"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                <strong
                  className={classNames({
                    ['has-text-danger']: !currentTodo.completed,
                    ['has-text-success']: currentTodo.completed,
                  })}
                >
                  {!currentTodo.completed ? 'Planned' : 'Done'}
                </strong>

                {/*/!* For completed *!/*/}

                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
