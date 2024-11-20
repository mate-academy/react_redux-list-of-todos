import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  user?: User | null;
  todo: Todo | null;
  isLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({ user, todo, isLoading }) => {
  const dispatch = useAppDispatch();

  const handleButton = () => {
    dispatch(currentTodoSlice.actions.set(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(isLoading && <Loader />) || (
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
              onClick={handleButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {(!todo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )) || <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
