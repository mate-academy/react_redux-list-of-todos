import React from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { reset } from '../../features/currentTodo';
import { CurrentTodo } from '../../types/currentTodo';

type Props = {
  currentTodo: CurrentTodo | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setIsOpen(false);
    dispatch(reset());
  };

  return (
    <div
      className={classNames('modal', { 'is-active': isOpen })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {currentTodo ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${currentTodo?.email}`}>{currentTodo?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
