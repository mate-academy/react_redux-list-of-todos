import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  user: User;
  todo: Todo;
}

export const ModalCard: React.FC<Props> = ({ user, todo }) => {
  const { name, email } = user;
  const {
    id,
    title,
    completed,
  } = todo;
  const dispatch = useAppDispatch();

  const handlerCloseModal = () => {
    dispatch(actionsCurrentTodo.removeTodo());
  };

  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          {`Todo #${id}`}
        </div>

        <button
          type="button"
          className="delete"
          data-cy="modal-close"
          aria-label="Close modal"
          onClick={handlerCloseModal}
        />
      </header>

      <div className="modal-card-body">
        <p className="block" data-cy="modal-title">
          {title}
        </p>

        <p className="block" data-cy="modal-user">
          {completed ? (
            <strong className="has-text-success">Done</strong>
          ) : (
            <strong className="has-text-danger">Planned</strong>
          )}

          {' by '}

          <a href={email}>
            {name}
          </a>
        </p>
      </div>
    </div>
  );
};
